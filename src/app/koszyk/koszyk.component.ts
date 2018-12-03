import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductInterface } from '../produkty/productInterface';
import { ProduktServisService } from '../produkt-servis.service';
import { Subscription } from 'rxjs';
import { MessageServiceService } from '../message-service.service';
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

  // subscription: Subscription;
 

  constructor(private productsService : ProduktServisService, private messageService : MessageServiceService) { 
    this.cart = [];
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
    let p =  {
      id: product.id,
      name: product.name,
      count: 1,
      price: -product.price,
      description: product.description,
      img: product.img
    }// as ProductInterface;
    this.messageService.sendMessage(p)
    this.productsService.deleteFromCart(p)
    this.productsService.getProduct(p.id).subscribe(
      product => {p.count = product.count + 1;
      this.productsService.updateProduct(p).subscribe(
        _ => this.updateStats()
      )}
    )
    
  }

}
