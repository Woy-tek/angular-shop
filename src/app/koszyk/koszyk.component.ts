import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductInterface } from '../produkty/productInterface';
import { ProduktServisService } from '../produkt-servis.service';
import { Subscription } from 'rxjs';
import { MessageServiceService } from '../message-service.service';
import { AngularFireDatabase } from 'angularfire2/database';
// import { MessageServiceService } from '../message-service.service';

@Component({
  selector: 'app-koszyk',
  templateUrl: './koszyk.component.html',
  styleUrls: ['./koszyk.component.css'],
  providers: []
})
export class KoszykComponent implements OnInit, OnDestroy {

  cart : ProductInterface[] = [];
  choose: number = 0;
  count : number = 0;
  sum : number = 0;

  napis : string = "";

  products : ProductInterface[];

  // subscription: Subscription;
 

  constructor(private productsService : ProduktServisService, private messageService : MessageServiceService, private db : AngularFireDatabase) { 
    this.cart = [];
    this.db.list<ProductInterface>('/products').valueChanges().subscribe(
      a => {
        this.products = a
      }
    )
    // this.subscription = this.messageService.getMessage().subscribe(message => {this.addToCart(message); console.log(this.cart[this.count].name)});
  }

  ngOnInit() {
    this.cart = this.productsService.getCart();
    // this.cart = this.productsService.getProducts();
    this.updateStats()
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  updateStats(){
    this.count = 0;
    this.sum = 0;
    this.cart.forEach((element) => {
      this.count += element.count;
      this.sum += element.price * element.count;
    });
  }

  deleteProduct(product : ProductInterface){
    let p2 = this.products.filter(a => (a.name === product.name) )[0]
    let p =  {
      id: product.id,
      name: product.name,
      count: 1,
      price: -product.price,
      description: product.description,
      img: product.img
    }// as ProductInterface;

    this.db.object('/products/' + product.id).update(
      {count: p2.count+1}
    )
    this.productsService.deleteFromCart(p)
    this.messageService.sendMessage(p)
    this.updateStats()
    // this.productsService.getProduct(p.id).subscribe(
    //   product => {p.count = product.count + 1;
    //   this.productsService.updateProduct(p).then(
    //     _ => this.updateStats()
    //   )}
    // )
    
  }

  addProduct(product : ProductInterface){

    let p = this.products.filter(a => (a.name === product.name) )[0]

    let p2 =  {
      id: product.id,
      name: product.name,
      count: 1,
      price: product.price,
      description: product.description,
      img: product.img
    }// as ProductInterface;

    this.db.object('/products/' + product.id).update(
      {count: p.count-1}
    )
    this.productsService.addToCart(p2);
    this.messageService.sendMessage(p2);
    this.updateStats()

    // this.productsService.getProduct(p.id).subscribe(
    //   a => {
    //     if(a.count > 0){
    //       console.log("A: " + a.name)
    //     }
    //   }
    // )

    // this.productsService.getProduct(p.id).subscribe(
    //   a =>{
    //     if(a.count > 0){
    //       this.messageService.sendMessage(p);
    //       this.productsService.addToCart(p);
    //       this.productsService.updateProduct(p);
    //     }
    //   }
    // )
    }

  // add(p : ProductInterface){
  //   this.messageService.sendMessage(p)
  //   this.productsService.addToCart(p);
  //   // this.productsService.getProduct(p.id).subscribe(
  //   //   product => {
  //     p.count = p.count - 1;
  //     console.log('LICZBA: ' + p.count)
  //     this.productsService.updateProduct(p)
  //     // .then(
  //     //   _ => { console.log('BBB'); this.updateStats();}
  //     // )
  //   // }
  //   // )
  // }

}
