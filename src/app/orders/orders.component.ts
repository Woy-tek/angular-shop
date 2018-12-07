import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { OrderService, Order } from '../order.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders : Order[]
  order : Order

  filter : string = ''

  constructor(
    private orderService : OrderService,
    private db : AngularFireDatabase) { }

  ngOnInit() {
    this.order = {
      id: '',
      name: '',
      surname: '',
      address: '',
      email: '',
      status: '',
      dataIn: '',
      dataOut: '',
      products: [],
      productsStatus: []
    }
    this.db.list('/orders').valueChanges().subscribe(
      data => {
        this.orders = <Order[]>data;
        // this.order = this.orders[0]
      }
    )
  }

  setOrder(order : Order){
    this.order = order
  }

  updateOrder(order : Order){
    if(order.status === 'zrealizowane') order.dataOut = this.orderService.getData()
    this.orderService.updateOrder(order)
  }

  filterWaitings(){
    this.filter = 'oczekujące'
  }

  filterInProgress(){
    this.filter = 'w trakcie realizacji'
  }

  filterDone(){
    this.filter = 'zrealizowane'
  }

  resetFilter(){
    this.filter = ''
  }

}
