import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { ProductInterface } from '../produkty/productInterface';
import { Observable } from 'rxjs';
import { ProduktServisService } from '../produkt-servis.service';
import { FirebaseServiceService, Item } from '../firebase-service.service';

@Component({
  selector: 'app-firebase-actions',
  templateUrl: './firebase-actions.component.html',
  styleUrls: ['./firebase-actions.component.css']
})
export class FirebaseActionsComponent implements OnInit {

  products : Item[];
  product : Item = {
    id: '',
    name: '',
    price: 0.0
  };

  constructor(private firebaseDb : FirebaseServiceService) { }

  ngOnInit() {
    this.firebaseDb.getProducts().subscribe(
      data => {
        this.products = data;
      }
    );
    // this.data = this.db.list<ProductInterface>('/products');
    // this.data.valueChanges().subscribe(
    //   data => {
    //     this.p = data;
    //   }
    // );
    // this.data.snapshotChanges().subscribe(
    //   data => {
    //     data.forEach(
    //       action => {
    //         console.log("AAA " + action.payload.val().name + " " + action.payload.key)
    //       }
    //     )
    //   }
    // )
  }

  add(){
    this.firebaseDb.addProduct();
  }

  update(item : Item){
    this.firebaseDb.updateProduct(item);
  }

  get(item : Item){
    this.firebaseDb.getProduct(item).valueChanges().subscribe(
      data => {
        this.product = data;
      }
    )
  }

}
