import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth, User } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
    public user$: Observable<User>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router
    ) {
        this.getUser();
    }

    public async googleSignin() {
        await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }

    public async signOut() {
        await this.afAuth.auth.signOut();
        this.router.navigate(['/']);
    }

    private getUser() {
        this.user$ = this.afAuth.authState.pipe(
            switchMap(user => {
                // Logged in
                if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges().pipe(shareReplay(1));
                } else {
                    // Logged out
                    return of(null);
                }
            })
        );
    }
}
