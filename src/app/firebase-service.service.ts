import { Injectable } from '@angular/core';
import { FirebaseDatabase } from 'angularfire2';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { ProductInterface } from './produkty/productInterface';

export class Item{
  id : string;
  name : string;
  price : number;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  products : AngularFireList<any>
  product : AngularFireObject<any>

  constructor(private db : AngularFireDatabase) { 
    this.products = this.db.list('/items');
  }

  getProducts(){
    return this.products.valueChanges();
  }
  
  getProduct(item : Item){
    return this.db.object<Item>('products/' + item.id);
  }

  addProduct(){
    // this.products.push(product);
    let p = {
      id: this.db.createPushId(),
      name: "Kiełbasa",
      price: 50.0,
      count: 50,
      description: "Zdrowa, smaczna, najlepsza",
      img: "https://res.cloudinary.com/dj484tw6k/f_auto,q_auto,c_pad,b_white,w_360,h_360/v1499882496/be/40940.jpg"
    }

    this.db.object('/products/' + p.id).update(p);

  }

  updateProduct(item : Item){
    this.db.object('/items/' + item.id //-LSzqA9aAfsCQLeasNQY'
              ).update({
      name: "Rozmaryn"
    })
  }



}
