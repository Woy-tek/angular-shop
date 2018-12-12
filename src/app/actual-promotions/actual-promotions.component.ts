import { Component, OnInit } from '@angular/core';
import { ProduktServisService } from '../produkt-servis.service';
import { PromotionMessageService } from '../promotion-message.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Promotion } from '../promotions/promotions.component';
import { HttpClient } from '@angular/common/http';
import { ProductInterface } from '../produkty/productInterface';

@Component({
  selector: 'app-actual-promotions',
  templateUrl: './actual-promotions.component.html',
  styleUrls: ['./actual-promotions.component.css']
})
export class ActualPromotionsComponent implements OnInit {

  promotions : PromotionExt[] = []
  products : ProductInterface[] = []

  promo : Promotion[] = []

  constructor(private productService : ProduktServisService,
    private promoService : PromotionMessageService,
    private db : AngularFireDatabase,
    private http : HttpClient) { }

  ngOnInit() {
    if(this.productService.promoSource === 'firebase'){
      this.loadData()
    }else{
      this.promoService.messages.subscribe(
        msg => {
          this.loadData()
        }
      )
    }
  }

  loadData(){
    if(this.productService.dataSource === 'firebase'){
      this.db.list<ProductInterface>('/products').valueChanges().subscribe(
        data => {
          this.products = data;

          if(this.productService.promoSource === 'firebase'){
            this.getFirebasePromo();
          }else{
            this.getSocketPromos();
          }
        }
      )
    }else{
      this.http.get<ProductInterface[]>('api/products').subscribe(
        data =>{
          this.products = [];
          data.forEach(
            a => {
              this.products.push(a);
            }
          )
          
          if(this.productService.promoSource === 'firebase'){
            this.getFirebasePromo();
          }else{
            this.getSocketPromos();
          }
        }
      )
    }
  }

  getFirebasePromo(){
    this.db.list<Promotion>('/promotions').valueChanges().subscribe(
      anwser => {
        this.promo = anwser;
        this.promotions = [];
        this.promo.forEach(
          p => {
            let pro = [];
            p.products.forEach(
              a => {
                let name = this.products.filter(prod => prod.id === a)[0].name;
                pro.push({
                  id: a,
                  name: name
                })
              }
            )
            this.promotions.push({
              id: p.id,
              discount: p.discount,
              time: p.time,
              products: pro
            })
          }
        )
      }
    )
  }

  getSocketPromos(){
    this.http.get<Promotion[]>('api/promotions').subscribe(
      data => {
        this.promotions = [];
        this.promo = []
        data.forEach(
          a => {
            this.promo.push(a);
          }
        )

        this.promo.forEach(
          p => {
            let pro = [];
            p.products.forEach(
              a => {
                let name = this.products.filter(prod => prod.id === a)[0].name;
                pro.push({
                  id: a,
                  name: name
                })
              }
            )
            this.promotions.push({
              id: p.id,
              discount: p.discount,
              time: p.time,
              products: pro
            })
          }
        )


      }
    )
  }

}

interface ProductMin{
  id: string,
  name: string  
}

interface PromotionExt{
  id : string,
  products : ProductMin[],
  discount : number,
  time : number
}