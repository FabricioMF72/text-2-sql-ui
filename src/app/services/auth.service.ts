import { inject, Injectable, Signal } from '@angular/core';
import {Auth, GoogleAuthProvider, signInWithPopup, user, User} from '@angular/fire/auth';
import {Router} from "@angular/router";
import {toSignal} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router)
  public user: Signal<User | null | undefined> = toSignal(user(this.auth));

  public async loginWithGoogle() {
    await signInWithPopup(this.auth, new GoogleAuthProvider())
        .then(response => {
          if (response.user) {
            this.router.navigate(['/dashboard']);
          } else {
            console.error('Login failed')
          }
        })
  }

    public async logout() {
        await this.auth.signOut().then(() => {
            this.router.navigate(['/login']);
        });
    }

    public async getIdToken(): Promise<string | null> {
        const currentUser = this.auth.currentUser;
        if (currentUser) {
            return await currentUser.getIdToken();
        }
        return null;
    }
}
