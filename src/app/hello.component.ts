import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { MessageRoleService } from './message-role.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'hello-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class HelloComponent implements OnInit, OnDestroy {
  // title = 'hello-world';
  // imie = 'Jan';
  // nazwisko = 'Kowalski'

  // tabString = ["Ala","ma","kota"]
  // tabNumerow = [4,5,6,7]
  subscription: Subscription;

  role : string = ''

  constructor(private authService : AuthService, 
    private messageService : MessageRoleService,
    private router : Router){
    this.subscription = this.messageService.getMessage().subscribe(
      message => {
        this.role = message
      }
    )
  }

  ngOnInit(){
    this.role = this.authService.role
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['/login'])
  }

  // tabliczka(tabStr:string[], tabNum:number[]){

  //   for(let tab1 of tabStr){
  //     for(let tab2 in tabNum){
  //       console.log(tab1 + tabNum[tab2] + " ");
  //     }
  //     console.log("\n");
  //   }
  // }

}
