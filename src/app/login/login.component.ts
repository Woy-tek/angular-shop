import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login : string;
  password : string;

  info : string;

  constructor(private auth : AuthService) { }

  ngOnInit() {
  }

  loginUser(){
    // this.auth.login({email: this.login, password: this.password});
    this.auth.register({email: this.login, password: this.password}).then(
      fulfilled => {
        this.info = "OK"
      }, rejected => {
        this.info = rejected.message;
      }
    )
  }

  loginUser2(){
    this.auth.login({email: this.login, password: this.password}).then(
      fulfilled => {
            this.info = "OK"
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

}
