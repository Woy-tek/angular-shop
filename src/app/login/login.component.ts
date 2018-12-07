import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login : string;
  password : string;

  info : string;

  constructor(private auth : AuthService, 
    private db : AngularFireDatabase,
    private router : Router) { }

  ngOnInit() {
  }

  loginUser(){
    // this.auth.login({email: this.login, password: this.password});
    this.auth.register({email: this.login, password: this.password}).then(
      fulfilled => {
        this.info = "Rejestracja zakończona sukcesem.\nMożna się zalogować"
        this.addUser(this.login)
      }, rejected => {
        this.info = rejected.message;
      }
    )
  }

  loginUser2(){
    this.auth.login({email: this.login, password: this.password}).then(
      fulfilled => {
            this.info = "OK"
            this.router.navigate(['/admin'])
          }, rejected => {
            this.info = rejected.message;
          }
    );
    // this.auth.register({email: this.login, password: this.password}).then(
    //   fulfilled => {
    //     this.info = "OK"
    //   }, rejected => {
    //     this.info = rejected.message;
    //   }
    // )

    
  }

  add(){
    this.addUser('woy181@wp.pl');
  }

  addUser(name : string){
    let u = {
      id: this.db.createPushId(),
      email: name,
      role: 'worker'
    }

    this.db.object('/users/' + u.id).update(u);

  }

}
