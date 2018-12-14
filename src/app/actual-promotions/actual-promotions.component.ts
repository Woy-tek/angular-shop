import { Component, OnInit } from '@angular/core';
import { ProduktServisService } from '../produkt-servis.service';
import { PromotionMessageService } from '../promotion-message.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Promotion } from '../promotions/promotions.component';
import { HttpClient } from '@angular/common/http';
import { ProductInterface } from '../produkty/productInterface';
import { PromoManagerService } from '../promo-manager.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-actual-promotions',
  templateUrl: './actual-promotions.component.html',
  styleUrls: ['./actual-promotions.component.css']
})
export class ActualPromotionsComponent implements OnInit {

  promotions : PromotionExt[] = []
  products : ProductInterface[] = []

  promo : Promotion[] = []

  date : number = 0//Date = new Date()

  constructor(private productService : ProduktServisService,
    private promoService : PromotionMessageService,
    private promoManService : PromoManagerService,
    private db : AngularFireDatabase,
    private http : HttpClient,
    private actualTime : PromoManagerService) { }

  ngOnInit() {
    // setInterval(
    //   () => {
    //     this.date = this.actualTime.now;
    //   },1000
    // )
    if(this.productService.promoSource === 'firebase'){
      this.loadData()
      // this.deleteExpired();
    }else{
      this.promoService.messages.subscribe(
        msg => {
          this.loadData()
          // this.deleteExpired();
        }
      )
    }

    this.actualTime.getMessage().subscribe(
      data => {
        this.date = data;
        if(this.promotions !== []) this.deleteExpired();
      }
    )

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
        this.deleteExpired();
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
        this.deleteExpired();
      }
    )
  }

  deleteExpired(){
    
    let result = [];
    let result2 = [];
    this.promotions.forEach(
      p => {
        if(p.time >= this.date){
          result.push(p);
        }else{
          if(this.productService.promoSource === 'firebase'){
            this.db.object<Promotion>('/promotions/' + p.id).remove();
            // if(this.productService.promoSource !== 'firebase'){
              // this.promoService.sendMsg(p)
            // }
          }else{
            this.http.delete<Promotion>('api/promotions/' + p.id).pipe(
              tap(() => console.log('aaa'))
            ).subscribe(
              a => {
                console.log("deleted promotion");
                // this.promoService.sendMsg(p)
              }
            );
          }
        }
      }
    )
    this.promotions = result;

    this.promo = []
    this.promotions.forEach(
      p => {
        let tab = [];
        p.products.forEach(
          pp => {
            tab.push(pp.id);
          }
        )
        this.promo.push(
          {
            id: p.id,
            products: tab,
            discount: p.discount,
            time: p.time
          }
        )
      }
    )

    if(this.productService.promoSource !== 'firebase'){
      this.promoManService.sendPromoTable(this.promo)
    }else{

    }
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