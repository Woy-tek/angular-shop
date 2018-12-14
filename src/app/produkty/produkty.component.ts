import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductInterface } from './productInterface';
import { ProduktServisService } from '../produkt-servis.service';
import { KoszykComponent } from '../koszyk/koszyk.component';
import { PagesService } from '../pages.service';
import { element } from '@angular/core/src/render3';
import { Observable } from 'rxjs';
import { findIndex, tap, filter } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { Promotion } from '../promotions/promotions.component';
import { PromotionMessageService } from '../promotion-message.service';

@Component({
  selector: 'hello-produkty',
  templateUrl: './produkty.component.html',
  styleUrls: ['./produkty.component.css'],
  providers: [PagesService]
})
export class ProduktyComponent implements OnInit {

  products : ProductInterface[] = [];

  sum : number;

  pagedProducts : ProductInterface[] = [];
  pagination : number[] = [];

  filterTab : string[] = [];
  minFilter : number = 0;
  maxFilter : number = 0;

  checkbox1 : boolean = false;
  checkbox2 : boolean = false;
  checkbox3 : boolean = false;

  keyWord : string = ''

  obj : Observable<ProductInterface>;

  // data1 = new Date().getTime()
  // data2 = new Date().getTime() + 100


  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private productsService : ProduktServisService, 
    private pagesService : PagesService,
    private http : HttpClient,
    private db : AngularFireDatabase,
    private promoService : PromotionMessageService) { 
    // this.napis = this.productsService.napis;
    // this.productsService.nap("BBB");;
    // console.log(this.data2 - this.data1)
  }

  ngOnInit() {
    // if(this.productsService.dataSource === 'firebase'){
      this.getProducts();
    // }else{
    //   this.http.get<ProductInterface[]>('api/products').subscribe(
    //     anwser => {
    //       console.log(anwser)
    //       this.products = []
    //       anwser.forEach(
    //         product => {
    //           console.log(product)
    //           this.products.push(product)
    //         }
    //       )
    //     }
    //   );  
    // }
  }

  // aaa(){
  //   // this.obj = this.productsService.getFireBaseProduct("Pomidor");
  // }

  // bbb(){
  //   console.log(this.obj);
  // }

  getProducts() : void {
    if(this.productsService.dataSource === 'firebase'){
    this.productsService.getProducts().subscribe(
      element => {
        this.products = element;

        this.sum = 0;
        for(let i of this.products){
          this.sum += i.count;
        }
    
        this.getMax();
        this.getDescriptions();
        this.setPage(this.pagesService.currentPage);
      }
    )
    }else{
      this.getHttpProducts();
    }
  }

  getHttpProducts(){
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

        this.sum = 0;
        for(let i of this.products){
          this.sum += i.count;
        }
    
        this.getMax();
        this.getDescriptions();
        this.setPage(this.pagesService.currentPage);
      }
    );  
  }


  getProduct(id : number){
    this.productsService.getProduct(id).subscribe(
      element => console.log("Pobrano: " + element.name)
    )
  }

  addToCart(product : ProductInterface){
    let orgPrice = this.products.filter(p => p.id === product.id)[0].price;
    // console.log("ORG PRICE: " + orgPrice)
    let p = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      count: product.count - 1,
      img: product.img
    }

    // console.log(p);

    let p2 = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: orgPrice,
      count: product.count - 1,
      img: product.img
    }

    let p3 = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: orgPrice,
      count: product.count - 1,
      img: product.img
    }

    // console.log(p2);

    if(this.productsService.dataSource === 'firebase'){
      this.productsService.updateProduct(p2)
    }else{
      // console.log('POST')
      this.http.post<ProductInterface>('api/products',p3,this.httpOptions).pipe(
        tap(_ => console.log(`updated product`))
        // ,catchError(this.handleError<ProductInterface>("Update product ERROR"))
      ).subscribe(
        a => console.log('')//this.getHttpProducts()
      )
    }
    // .then(
    //   product => {
    //     console.log('AAA');
    //     this.getProducts();
    //   }
    // )
    p.count = 1;
    this.productsService.addToCart(p);
    // console.log('CART');
    // console.log(this.productsService.getCart());
    // this.productsService.getProduct(p.id).subscribe(
    //   p => console.log(p.id + " " + p.name)
    // )
  }

  deleteProduct(product : ProductInterface){
    this.products = this.productsService.deleteProductFromTable(product,this.products);
    this.setPage(this.pagesService.currentPage);
  }

  add(product : ProductInterface){
    this.products = this.productsService.addProductToTable(product,this.products);
  }

  sub(product : ProductInterface){
    this.products = this.productsService.deleteProductFromTable(product,this.products);
  }

  addNewProduct(product : ProductInterface){
    this.add(product);
  }

  setColor(count:number) : string{
    if(count <= 3){
      return '#FBFF70'
    }else{
      return '#B0C7ED'
    }
  }

  setBorder(price:number) : string {
      let max:number = 0;
      let min:number = 1000000;
      for(let i of this.products
    ){
        if(i.price > max) max = i.price;
        if(i.price < min) min = i.price;
      }

      if(price == max) return 'solid';
      if(price == min) return 'dotted';
      return 'none';

  }

  setSum() : string{
    if(this.sum < 10){
      return 'red';
    }else{
      return 'green'
    }
  }

  setSumNum(){
    this.sum = 0;
    for(let i of this.products
  ){
      this.sum += i.count;
    }
  }

  filteringTab(tab : ProductInterface[], min : number, max : number){
    let resultTab = [];
    if(this.keyWord !== ''){
      this.filterTab.push(this.keyWord);
    }
    if(this.filterTab.length == 0){
      tab.forEach(element => {
        if(element.price >= min && element.price <= max){
          let i = resultTab.findIndex(t => t.name === element.name);
          if(i < 0) resultTab.push(element);
        }
      })
    }else{
      tab.forEach(element => {
        if(element.price >= min && element.price <= max){
          // console.log('AAA: ' + element)
          this.filterTab.forEach(e => {
            if((element.description.toLowerCase().indexOf(e.toLowerCase()) > -1) ){
              // console.log(e + " " + element.name)
              let i = resultTab.findIndex(t => t.name === element.name);
              if(i < 0) resultTab.push(element);
            }
            if((element.name.toLowerCase().indexOf(e.toLowerCase()) > -1) ){
              // console.log(e + " " + element.name)
              let i = resultTab.findIndex(t => t.name === element.name);
              if(i < 0) resultTab.push(element);
            }
            // if(e == element.description) resultTab.push(element);
          })
        }
      })
    }

    if(this.keyWord !== ''){
      let i = this.filterTab.indexOf(this.keyWord);
      if(i > -1) this.filterTab.splice(i,1);
    }

    return resultTab;
  }

  // resetFilter(){
  //   this.minFilter = 0;
  //   this.getMax();
  //   this.checkbox1 = false;
  //   this.checkbox2 = false;
  //   this.checkbox3 = false;
  //   this.getDescriptions();
  //   this.setPage(0);
  // }

  setPage(page : number){
    this.pagesService.setPage(page);
    this.pagination = this.pagesService.getPagesInit(this.filteringTab(this.products,this.minFilter,this.maxFilter));
    this.pagedProducts = this.pagesService.getCurrentPages(this.filteringTab(this.products,this.minFilter,this.maxFilter));
  }

  addToFilter(condition : string){
    this.filterTab.push(condition);
  }

  removeFromFilter(condition : string){
    let i = this.filterTab.findIndex(t => t == condition);
    this.filterTab.splice(+i,1);
  }

  doFiltering(condition : string){
    let i = this.filterTab.findIndex(t => t == condition);
    if(i >= 0) this.filterTab.splice(+i,1);
    else this.filterTab.push(condition);
  }

  resetFilter(){
    this.minFilter = 0;
    this.getMax();
    this.checkbox1 = false;
    this.checkbox2 = false;
    this.checkbox3 = false;
    this.keyWord = '';
    this.getDescriptions();
    this.setPage(0);
  }

  getMax(){
    this.products.forEach(element => {
      if(element.price > this.maxFilter) this.maxFilter = element.price;
    })
  }

  getDescriptions(){
    this.filterTab = []
    // this.products.forEach(element => {
    //     let i = this.filterTab.findIndex(t => t == element.description);
    //     if(i < 0 ) this.filterTab.push(element.description);
    //   }
    // )
  }

  getCart() : ProductInterface[]{
    return this.productsService.getCart();
  }

  // getMax(){
  //   this.products.forEach(element => {
  //     if(element.price > this.maxFilter) this.maxFilter = element.price;
  //   })
  // }

  // getDescriptions(){
  //   this.filterTab = []
  //   this.products.forEach(element => {
  //       let i = this.filterTab.findIndex(t => t == element.description);
  //       if(i < 0 ) this.filterTab.push(element.description);
  //     }
  //   )
  // }

}
