import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth, User } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { BehaviorSubject, of, from, merge } from 'rxjs';
import { take, tap, switchMap, filter } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private user$ = new BehaviorSubject<User>(null);
    public get user(): BehaviorSubject<User> {
        return this.user$;
    }

    private dataLoaded$ = new BehaviorSubject<boolean>(false);
    public get dataLoaded(): BehaviorSubject<boolean> {
        return this.dataLoaded$;
    }

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        protected storageService: StorageService,
        private router: Router
    ) {
        this.loadData();
        this.listenForUserAuthActions();
    }

    public async googleSigninViaPopUp() {
        await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }

    public async googleSigninViaRedirect() {
        await this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
    }

    public async signOut() {
        await this.afAuth.auth.signOut().then(() => {
            this.storageService.wipeStorage();
            window.location.reload();
        });
    }

    /**
     * Starts a stream that will update the local storage user
     * as soon as AF auth detects a user has logged in or out.
     */
    private listenForUserAuthActions() {
        this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    const newUser = {
                        displayName: user.displayName,
                        photoUrl: user.photoURL,
                        uid: user.uid,
                        email: user.email,
                        roles: {}
                    };
                    const user$ = this.afs.doc<User>(`users/${user.uid}`).valueChanges();

                    const userFound$ = user$.pipe(
                        filter(dbUser => dbUser !== undefined && dbUser !== null),
                    );
                    const userNotFound$ = user$.pipe(
                        filter(dbUser => dbUser === undefined || dbUser === null),
                        switchMap(() => from(this.afs.collection<any>('users').doc(user.uid).set(newUser).then(() => newUser)))
                    );

                    // Logged in
                    return merge(userFound$, userNotFound$);
                } else {
                    // Logged out
                    return of(null);
                }
            }),
            tap(user => this.updateUser(user))
        ).subscribe();
    }

    private loadData() {
        this.storageService.select('user').pipe(
            take(1),
            tap((user: User) => this.updateUser(user)),
            tap(() => this.dataLoaded$.next(true))
        ).subscribe();
    }

    private updateUser(user: User) {
        this.user$.next(user);
        this.storageService.set('user', user);
    }
}
