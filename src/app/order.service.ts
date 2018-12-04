import { Injectable } from '@angular/core';
import { Order } from './potwierdzenie/potwierdzenie.component';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  currentOrder : Order;
  orders : Order[];

  constructor() { }

  getOrders(){
    this.orders = [];
  }

  addOrder(order : Order){

  }

}
