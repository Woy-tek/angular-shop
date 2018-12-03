import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageServiceService } from '../message-service.service';
import { ProductInterface } from '../produkty/productInterface'
import { Subscription } from 'rxjs';
import { ProduktServisService } from '../produkt-servis.service';

@Component({
  selector: 'app-koszyk-view',
  templateUrl: './koszyk-view.component.html',
  styleUrls: ['./koszyk-view.component.css']
  , providers: []
})
export class KoszykViewComponent implements OnInit, OnDestroy {

  count : number = 0;
  sum : number = 0.0;
  cart : ProductInterface[] = [];

  napis : string = "";

  subscription: Subscription;

  constructor(private messageService : MessageServiceService, private productService : ProduktServisService) { 
    this.subscription = this.messageService.getMessage().subscribe(message => {

      var product = message;
      console.log(product);

      if(product.price < 0){
        this.count--;
        this.sum += product.price;
        product.price = (-1)*product.price;
      }else{
        this.count++;
        this.sum += message.price;
      }

      //   var p = {
      //     name: message.name,
      //     count: 1,
      //     price: message.price,
      //     description: message.description,
      //     img: message.img
      //   };
      //   console.log(message.price)
        
      // if(message.price < 0){
      //   this.count--;
      //   this.sum += message.price;
      //   p.price = (-1)*p.price;
      //   // this.productService.deleteFromCart(p);

      // }else{
      //   this.count++;
      //   this.sum += message.price;
        
  
      //   // this.productService.addToCart(p);
      // }
    });
  }

  ngOnInit() {
      this.cart = this.productService.getCart();
      // this.count = this.cart.length;
      // this.sum = this.count*2;
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
    // console.log("END");
  }

}
