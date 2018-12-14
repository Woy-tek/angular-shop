import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { ProduktServisService } from './produkt-servis.service';
import { Promotion } from './promotions/promotions.component';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromoManagerService {

  subject = new Subject<number>()
  now : number //Date = new Date()
  // promotions : Promotion[] = []

  promoSubject = new Subject<Promotion[]>()

  constructor(
    // private db : AngularFireDatabase,
    // private http : HttpClient,
    // private productService : ProduktServisService
  ) { 
    // if(productService.dataSource === 'firebase'){
    //   this.getFirebase();
    // }else{
    //   this.getHttp();
    // }

    setInterval(
      () => {
        this.now = new Date().getTime();
        // console.log(this.now)
        this.sendMessage(this.now);
      },5000
    )

  }

  sendMessage(n : number){
    this.subject.next(n);
  }

  getMessage() : Observable<number>{
    return this.subject.asObservable();
  }

  sendPromoTable(tab : Promotion[]){
    this.promoSubject.next(tab);
  }

  getPromoMessage() : Observable<Promotion[]>{
    return this.promoSubject.asObservable();
  }

  // getDate() : Date{
  //   // return this.now;
  // }

  // getFirebase(){
  //   this.db.list<Promotion>('/promotions').valueChanges().subscribe(
  //     anwser => {
  //       this.promotions = anwser;
  //     }
  //   )
  // }

  // getHttp(){
  //   this.http.get<Promotion[]>('api/promotions').subscribe(
  //     anwser =>{
  //       this.promotions = [];
  //       anwser.forEach(
  //         a => {
  //           this.promotions.push(a);
  //         }
  //       )
  //     }
  //   )
  // }

}
