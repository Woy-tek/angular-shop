import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order, OrderService } from 'src/app/order.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { ProductInterface } from 'src/app/produkty/productInterface';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input() order : Order
  @Output() update = new EventEmitter<Order>();
  a : boolean = true

  constructor() { }

  ngOnInit() {

  }

  checkProduct(product : ProductInterface){
    this.order.productsStatus.forEach(
      status => {
        if(status.id == product.id) status.isReady = !status.isReady
      }
    )
  }

  aaa(){
    this.order.productsStatus.forEach(
      a => {
        console.log("A " + a.isReady)
      }
    )
  }

  selectAll(){
    this.order.productsStatus.forEach(
      element => {
        element.isReady = true
      }
    )
  }

  deselectAll(){
    this.order.productsStatus.forEach(
      element => {
        element.isReady = false
      }
    )
  }

  saveChanges(){

    if(this.order.id === '') return

    let counter = 0
    let status = 'oczekujące'
    let dataOut = ''

    this.order.productsStatus.forEach(
      element => {
        if(element.isReady) counter++
      }
    )

    if(counter === this.order.productsStatus.length){
      status = 'zrealizowane'
    }
    if(counter === 0) status = 'oczekujące'
    if(counter !== 0 && counter < this.order.productsStatus.length) status = 'w trakcie realizacji'

    this.order.status = status
    this.update.emit(this.order)

  }

}
