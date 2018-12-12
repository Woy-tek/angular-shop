import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { Obj } from '../produkty.component';
// import { EventEmitter } from 'protractor';
import { Type } from '@angular/compiler';
import { ProductInterface } from '../productInterface';
import { MessageServiceService } from 'src/app/message-service.service';
import { ProduktServisService } from 'src/app/produkt-servis.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Promotion } from 'src/app/promotions/promotions.component';
import { PromotionMessageService } from 'src/app/promotion-message.service';
import { HttpClient } from '@angular/common/http';
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
    private db : AngularFireDatabase,
    private promoService : PromotionMessageService,
    private http : HttpClient) { }

  ngOnInit() {

    this.http.get<Promotion[]>('api/promotions').subscribe(
      data => {
        this.promotions = []
        data.forEach(
          a => {
            this.promotions.push(a);
          }
        )

        if(this.promotions !== undefined){
          let found = false;
          this.promotions.forEach(
            promotion => {
              if(promotion.products !== []){
                promotion.products.forEach(
                  id => {
                    if(id === this.product.id){
                      console.log(this.product.name + "Found");
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
          console.log(this.product.name + "discount")
          this.currentPrice = ((100-this.promotion.discount)/100) * this.product.price;
        }else{
          console.log(this.product.name + "ORG")
          this.currentPrice = this.orgPrice
        }

      

      }
    )

    // this.sendMessage();
    this.orgPrice = this.product.price
    this.currentPrice = this.orgPrice
    // console.log(this.product.name + "INIT")
    // console.log(this.promotions)
    this.getPromotions();
    // console.log(this.promotions)

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

  getP(){
    console.log(this.product.name + " IN P")
    console.log(this.promotions)
    this.promoService.messages.subscribe(
      data => {
        console.log(data);
        console.log(this.product.name + " IN SUB")
        console.log(this.promotions)
        let promo : Promotion = JSON.parse(data)
        // let promo : Promotion = {
        //   id: p.id,
        //   discount: p.discount,
        //   products: p.products,
        //   time: p.time
        // }
        console.log(this.product.name + " PARSE " + typeof(promo) + " " + promo.discount)
        console.log(this.promotions)
        let p = this.promotions.filter(a => a.id === promo.id)[0];
        let i = this.promotions.indexOf(p);
        // let j = -1
        // for(let i in this.promotions){
        //   if(this.promotions[i].id === promo.id){
        //     j = +i;
        //   }
        // }
        // console.log(this.product.name + " AFTER I " + j)
        // console.log(this.promotions)
        if(i > -1){
          this.promotions.splice(i,1);
        }else{
          this.promotions.push(promo);
        }
        console.log(this.promotions);
      }
    )
  }

  getPromotions(){
    if(this.productService.promoSource === 'firebase'){
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
      console.log(this.product.name + " IN")
      console.log(this.promotions)
      this.promoService.messages.subscribe(
        msg => {
          console.log(msg);
          console.log(this.promotions);
          let promo : Promotion = JSON.parse(msg)
          console.log(this.product.name + " PARSE " + typeof(promo) + " " + promo.discount)
          console.log(this.promotions)
          let p = this.promotions.filter(a => a.id === promo.id)[0];
          let i = this.promotions.indexOf(p);

          console.log(this.product.name + " i " + i);

          if(i > -1){
            console.log(this.product.name + "SPLICE");
            this.promotions.splice(i,1);
          }else{
            console.log(this.product.name + "PUSH");
            this.promotions.push(promo);
          }

          console.log(this.product.name + this.promotions)
          console.log(this.promotions)

          if(this.promotions !== undefined){
            let found = false;
            this.promotions.forEach(
              promotion => {
                if(promotion.products !== []){
                  promotion.products.forEach(
                    id => {
                      if(id === this.product.id){
                        console.log(this.product.name + "Found");
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
            console.log(this.product.name + "discount")
            this.currentPrice = ((100-this.promotion.discount)/100) * this.product.price;
          }else{
            console.log(this.product.name + "ORG")
            this.currentPrice = this.orgPrice
          }

        }
      )
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
