import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  permissionTo : string = 'worker'
  currentPermission : string

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit() {
    this.currentPermission = this.authService.role;
    if(this.currentPermission !== this.permissionTo){
      this.router.navigate(['/login']);
    }
  }

}
