import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth, User } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { of, BehaviorSubject } from 'rxjs';
import { switchMap, shareReplay, take, tap } from 'rxjs/operators';
import { StorageService } from './storage.service';

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
        await this.afAuth.auth.signOut();
        this.router.navigate(['/']);
    }

    /**
     * Starts a stream that will update the local storage user
     * as soon as AF auth detects a user has logged in or out.
     */
    private listenForUserAuthActions() {
        this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    // Logged in
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges().pipe(shareReplay(1));
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
