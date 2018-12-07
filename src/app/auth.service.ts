import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/index';
import { User } from 'firebase';
import { MessageRoleService } from './message-role.service';

export interface Credentials{
  email : string;
  password : string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly authState$:Observable<User | null> = this.fireAuth.authState;
  role : string = '';

  constructor(private fireAuth : AngularFireAuth, 
    private messageService : MessageRoleService) { }

  getUser() : User | null {
    return this.fireAuth.auth.currentUser;
  }

  login({email,password} : Credentials){
    return this.fireAuth.auth.signInWithEmailAndPassword(email,password);
  }

  register({email,password} : Credentials){
    return this.fireAuth.auth.createUserWithEmailAndPassword(email,password);
  }

  logout(){
    this.role = ''
    this.messageService.sendMessage('')
    return this.fireAuth.auth.signOut();
  }

}
