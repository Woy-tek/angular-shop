import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ProductInterface } from './produkty/productInterface';

export interface ProductStatus{
  id : string,
  isReady: boolean
}

export interface Order{
  id: string,
  name: string,
  surname: string,
  address: string,
  email: string,
  status: string,
  dataIn: string,
  dataOut: string,
  products : ProductInterface[],
  productsStatus: ProductStatus[]
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders : Order[] = [];

  constructor(private db : AngularFireDatabase) { }

  getOrders(){
    return this.db.list('/orders').valueChanges()
  }

  addOrder(order : Order){
    order.id = this.db.createPushId();
    this.db.object('/orders/' + order.id).update(order)
  }

  updateOrder(order : Order){
    this.db.object('/orders/' + order.id).update(order)
  }

  deleteOrder(order : Order){
    this.db.object('/orders/' + order.id).remove()
  }

  getData() : string{
    let date = new Date();
    return (date.getDate()) + '.' + (date.getMonth()+1) + '.' + date.getFullYear()
      + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
  }

  setProductStatus(products : ProductInterface[]) : ProductStatus[]{
    let result = []
    products.forEach(
      product => {

        let s : ProductStatus = {
          id: product.id,
          isReady: false
        } 

        result.push(s)
      }
    )

    return result
  }

}
