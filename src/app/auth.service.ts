import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/index';
import { User } from 'firebase';

export interface Credentials{
  email : string;
  password : string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly authState$:Observable<User | null> = this.fireAuth.authState;

  constructor(private fireAuth : AngularFireAuth) { }

  getUser() : User | null {
    return this.fireAuth.auth.currentUser;
  }

  login({email,password} : Credentials){
    // const session = this.fireAuth.auth.Pe
    // return this.fireAuth.auth.setPersistence(session).then(
    //   () => {
        return this.fireAuth.auth.signInWithEmailAndPassword(email,password);
      // }
    // )
  }

  register({email,password} : Credentials){
    return this.fireAuth.auth.createUserWithEmailAndPassword(email,password);
  }

  logout(){
    return this.fireAuth.auth.signOut();
  }

}
