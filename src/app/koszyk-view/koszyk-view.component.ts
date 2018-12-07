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
      // console.log(product);

      if(product.price < 0){
        this.count--;
        // console.log("AAA : " + typeof(product.price) + " " + typeof(this.sum))
        this.sum += product.price;
        product.price = (-1)*product.price;
      }else{
        this.count++;
        // console.log("BBB : " + typeof(product.price) + " " + typeof(this.sum))
        this.sum += message.price;
      }
    });
  }

  ngOnInit() {
    this.sum = 0.0;
    this.count = 0;
      this.cart = this.productService.getCart();
      this.cart.forEach(
        element => {
          this.count += element.count;
          this.sum += element.count * element.price;
        }
      )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
