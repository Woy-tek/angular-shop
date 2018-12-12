import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductInterface } from '../produkty/productInterface';
import { ProduktServisService } from '../produkt-servis.service';
import { Subscription } from 'rxjs';
import { MessageServiceService } from '../message-service.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Promotion } from '../promotions/promotions.component';
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
  promotions: Promotion[];

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // subscription: Subscription;
 

  constructor(private productsService : ProduktServisService, 
    private messageService : MessageServiceService, 
    private db : AngularFireDatabase,
    private http : HttpClient) { 
    this.cart = [];

    // this.subscription = this.messageService.getMessage().subscribe(message => {this.addToCart(message); console.log(this.cart[this.count].name)});
  }

  ngOnInit() {

    if(this.productsService.dataSource === 'firebase'){
      this.db.list<ProductInterface>('/products').valueChanges().subscribe(
        a => {
          this.products = a
        }
      )
      this.db.list<Promotion>('/promotions').valueChanges().subscribe(
        a => {
          this.promotions = a
        }
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
      )
    }

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

    let p3 = {
      id: product.id,
      name: product.name,
      count: p2.count+1,
      price: product.price,
      description: product.description,
      img: product.img
    }

    if(this.productsService.dataSource === 'firebase'){
      this.db.object('/products/' + product.id).update(
        {count: p2.count+1}
      )
      this.productsService.deleteFromCart(p)
      this.messageService.sendMessage(p)
      this.updateStats()
    }else{
      this.http.post<ProductInterface>('api/products',p3,this.httpOptions).pipe(
        tap(_ => console.log(`deleted product`))
        // ,catchError(this.handleError<ProductInterface>("Update product ERROR"))
      ).subscribe(
        a => {
          // console.log('CCC')
        this.ngOnInit();
        this.productsService.deleteFromCart(p)
        this.messageService.sendMessage(p)
        this.updateStats()
        }
      )
    }
    // this.productsService.getProduct(p.id).subscribe(
    //   product => {p.count = product.count + 1;
    //   this.productsService.updateProduct(p).then(
    //     _ => this.updateStats()
    //   )}
    // )
    
  }

  addProduct(product : ProductInterface){

    let p = this.products.filter(a => (a.name === product.name) )[0]

    let discount = 0;
    this.promotions.forEach(
      a => {
        let d = a.products.filter(pr => pr === p.id)[0];
        if(d !== undefined && d !== null){
          discount = a.discount;
        }
      }
    )

    let p2 = {
      id: product.id,
      name: product.name,
      count: 1,
      price: p.price,
      description: product.description,
      img: product.img
    }

    if(discount !== 0){
      p2 =  {
        id: product.id,
        name: product.name,
        count: 1,
        price: ((100-discount)/100) * product.price,
        description: product.description,
        img: product.img
      }// as ProductInterface;
    }else{
      p2 =  {
        id: product.id,
        name: product.name,
        count: 1,
        price: p.price,
        description: product.description,
        img: product.img
      }
    }
    // console.log('AAA')
    let p3 = {
      id: product.id,
      name: product.name,
      count: p.count-1,
      price: product.price,
      description: product.description,
      img: product.img
    }
    // console.log("AB")

    if(this.productsService.dataSource === 'firebase'){
      this.db.object('/products/' + product.id).update(
        {count: p.count-1}
      )
      this.productsService.addToCart(p2);
      this.messageService.sendMessage(p2);
      this.updateStats()
    }else{

      // console.log('BBB')
      this.http.post<ProductInterface>('api/products',p3,this.httpOptions).pipe(
        tap(_ => console.log(`added product`))
        // ,catchError(this.handleError<ProductInterface>("Update product ERROR"))
      ).subscribe(
        a => {
          // console.log('CCC')
        this.ngOnInit();
        this.productsService.addToCart(p2);
        this.messageService.sendMessage(p2);
        this.updateStats()
        }
      )

    }

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
