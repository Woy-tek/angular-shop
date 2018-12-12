import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { Obj } from '../produkty.component';
// import { EventEmitter } from 'protractor';
import { Type } from '@angular/compiler';
import { ProductInterface } from '../productInterface';
import { MessageServiceService } from 'src/app/message-service.service';
import { ProduktServisService } from 'src/app/produkt-servis.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Promotion } from 'src/app/promotions/promotions.component';
// import { Obj } from './produkty/produkty.component'

@Component({
  selector: 'hello-produkt',
  templateUrl: './produkt.component.html',
  styleUrls: ['./produkt.component.css']
  // ,providers: [MessageServiceService]
})
export class ProduktComponent implements OnInit {

  @Input() product : ProductInterface;
  @Output() toDelete = new EventEmitter<ProductInterface>();
  @Output() toAddToCart = new EventEmitter<ProductInterface>();

  showDetails : boolean = false;
  promotions : Promotion[] = []
  promotion : Promotion = {
    id: '',
    products: [],
    discount: 0,
    time: 0
  }

  orgPrice : number
  currentPrice : number

  constructor(private messageService: MessageServiceService,
    private productService : ProduktServisService,
    private db : AngularFireDatabase) { }

  ngOnInit() {
    // this.sendMessage();
    this.orgPrice = this.product.price
    this.currentPrice = this.orgPrice
    this.getPromotions();

  }

  showDescription(){
    this.showDetails = !this.showDetails
  }

  deleteProductComponent(product : ProductInterface){
    this.toDelete.emit(product);
  }

//   sendMessage(): void {
//     // if(this.product.count > 0){
//       this.messageService.sendMessage(this.product);
//       // this.product.count--;
//     // }
// }

  clearMessage(): void {
      // clear message
      this.messageService.clearMessage();
  }

  addToCart(){
    if(this.product.count > 0){
      let p : ProductInterface = {
        id: this.product.id,
        name: this.product.name,
        price: this.currentPrice,
        count: this.product.count,
        description: this.product.description,
        img: this.product.img
      }
      this.toAddToCart.emit(p);
      this.messageService.sendMessage(p);
    }
  }

  getPromotions(){
    if(this.productService.dataSource === 'firebase'){
      this.db.list<Promotion>('/promotions').valueChanges().subscribe(
        data => {
          this.promotions = data
          // console.log(this.product.name + ' ' + this.promotions)

          if(this.promotions !== undefined && this.promotions !== []){
            let found = false;
            this.promotions.forEach(
              promotion => {
                if(promotion.products !== []){
                  promotion.products.forEach(
                    id => {
                      if(id === this.product.id){
                        this.promotion = promotion
                        found = true
                      } 
                    }
                  )
                }
              }
            )
            if(!found) this.promotion = {
              id: '',
              products: [],
              discount: 0,
              time: 0
            }
          }

          if(this.promotion.discount !== 0){
            this.currentPrice = ((100-this.promotion.discount)/100) * this.product.price;
          }else{
            this.currentPrice = this.orgPrice
          }
        }
      )
    }else{

    }
  }

  // sendMessage(){
  //   console.log("AAA");
  //   this.messageService.sendMessage("LALALALLALALALAL");
  //   console.log("BBB");
  // }

  // clearMessage(){
  //   this.messageService.clearMessage();
  // }

  // addToCart(){
    // console.log(this.product.count);
    // if(this.product.count > 1){
      // this.sendMessage();
      // console.log(this.product.count);
      // this.product.count--;
    // }
  // }

}
