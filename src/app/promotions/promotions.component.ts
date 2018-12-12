import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ProductInterface } from '../produkty/productInterface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProduktServisService } from '../produkt-servis.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { PromotionMessageService } from '../promotion-message.service';
import { tap } from 'rxjs/operators';

export interface Promotion{
  id : string,
  products : string[],
  discount : number,
  time : number
}

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {

  permissionTo : string = "admin"
  currentPermission : string

  products : ProductInterface[]
  promotions : ProductInterface[] = []

  discount : number = 0.0
  time : number = 0

  actualPromos : Promotion[] = []

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private router : Router,
    private authService : AuthService,
    private http : HttpClient,
    private productService : ProduktServisService,
    private db : AngularFireDatabase,
    private promoService: PromotionMessageService) { }

  ngOnInit() {

    this.currentPermission = this.authService.role;
    if(this.currentPermission !== this.permissionTo){
      this.router.navigate(['admin/notFound']);
    }else{
      if(this.productService.dataSource === 'firebase'){
        this.productService.getProducts().subscribe(
          anwser => this.products = anwser
        )
      }else{
        this.http.get<ProductInterface[]>('api/products').subscribe(
          anwser => {
            // console.log(anwser)
            this.products = []
            anwser.forEach(
              product => {
                // console.log(product)
                this.products.push(product)
              }
            )
          }
        );

        this.http.get<Promotion[]>('api/promotions').subscribe(
          anwser => {
            this.actualPromos = [];
            anwser.forEach(
              promotion => {
                this.actualPromos.push(promotion);
              }
            )
          }
        )

      }
    }
  }

  add(){
    let p : Promotion = {
      id: '1111',
      discount: 20,
      time: 1000,
      products: [this.products[0].id,this.products[1].id]
    }
    this.http.post<Promotion>('api/promotions',p,this.httpOptions).pipe(
          tap(() => console.log('added'))
    ).subscribe(
      a => {
        console.log("POSZŁO");
      }
    );
  }

  sendMsg(){
    this.promoService.sendMsg("Test message");
  }

  addProductToPromotion(product : ProductInterface){
    if(this.promotions.indexOf(product) < 0) this.promotions.push(product)
  }

  deleteFromPromotions(product : ProductInterface){
    let i = this.promotions.indexOf(product)
    if(i > -1) this.promotions.splice(i,1)
  }

  addPromotion(){
    if(+this.discount > 100) this.discount = 100
    if(+this.discount < 0) this.discount = 0
    if(+this.time < 0) this.time = 0
    if(+this.time !== 0 && +this.discount !== 0 && this.promotions.length !== 0){

      // console.log(this.promotions.length)

      let ids = [];
      this.promotions.forEach(
        p => ids.push(p.id)
      )

      let promotion : Promotion = {
        id: this.db.createPushId(),
        products: ids,
        discount: +this.discount,
        time: +this.time
      } 

      let t = +this.time

      if(this.productService.promoSource === 'firebase'){
        this.db.object('/promotions/' + promotion.id).update(promotion)
        this.discount = 0,
        this.time = 0
        this.promotions = []
        setTimeout(() => {
          this.db.object('/promotions/' + promotion.id).remove()
        },t)
      }else{
        console.log('AAAAA');

        this.http.post<Promotion>('api/promotions',promotion,this.httpOptions).pipe(
              tap(() => console.log(''))
        ).subscribe(
          a => {
            console.log("added promotion");
          }
        );

        this.promoService.sendMsg(promotion);
        this.discount = 0;
        this.time = 0;
        this.promotions = [];
        setTimeout(() => {
          this.http.delete<Promotion>('api/promotions/' + promotion.id).pipe(
            tap(() => console.log(''))
          ).subscribe(
            a => {
              console.log("deleted promotion");
            }
          );
          this.promoService.sendMsg(promotion);
        },t)
      }
    }
    // console.log("AAA")

  }

  changePromo(){
    this.productService.changePromoSource();
  }

}
