import { Component, OnInit } from '@angular/core';
import { ProduktServisService } from '../produkt-servis.service';
import { ProductInterface } from '../produkty/productInterface';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-base',
  templateUrl: './product-base.component.html',
  styleUrls: ['./product-base.component.css']
})
export class ProductBaseComponent implements OnInit {

  permissionTo : string = "admin"
  currentPermission : string

  products : ProductInterface[];
  seen : string;

  sortByPrice : boolean = false;
  sortByName : boolean = false;
  sortByCount : boolean = false;

  productId : string;
  changeName : string;
  changeCount : number;
  changePrice : number;
  changeDesc : string;
  changeImg : string;

  newChangeName : string = '';
  newChangeCount : number = 0;
  newChangePrice : number = 0.0;
  newChangeDesc : string = '';
  newChangeImg : string = '';

  info : string = ''

  constructor(private productService : ProduktServisService,
    private db : AngularFireDatabase,
    private authService : AuthService,
    private router : Router ) { }

  ngOnInit() {

    this.currentPermission = this.authService.role;
    if(this.currentPermission !== this.permissionTo){
      this.router.navigate(['admin/notFound']);
    }else{
      this.productService.getProducts().subscribe(
        anwser => this.products = anwser
      )
    }
  }

  // checkIfSeen(name : string){
  //   if(name === this.seen) return true;
  //   return false;
  // }

  editProduct(product : ProductInterface){
    this.seen = product.name;
    this.changeName = product.name;
    this.changeCount = product.count;
    this.changePrice = product.price;
    this.changeDesc = product.description;
    this.changeImg = product.img;
    this.productId = product.id;

  }

  confirmChanges(product : ProductInterface){
    this.seen = '';
    let p : ProductInterface = 
    {
      id: this.productId,
      name: this.changeName,
      price: +this.changePrice,
      count: +this.changeCount,
      description: this.changeDesc,
      img: this.changeImg
    }
    this.db.object('/products/' + this.productId).update(p)
  }

  comeBack(){
    this.seen = '';
    this.changeName = '';
    this.changeCount = 0;
    this.changePrice = 0.0;
    this.changeDesc = '';
    this.changeImg = '';
    this.productId = '';
  }

  addNewProduct(){

    if(
      this.newChangeName === '' ||
      this.newChangeDesc === '' ||
      this.newChangeImg === ''
    ){ console.log("ZLE"); this.info = "Błędnie wypełnione dane!"; return }

    let product : ProductInterface = {
      id: this.db.createPushId(),
      name: this.newChangeName,
      price: +this.newChangePrice,
      count: +this.newChangeCount,
      description: this.newChangeDesc,
      img: this.newChangeImg
    }  

    this.db.object('/products/' + product.id).update(product)

    this.newChangeName = '';
    this.newChangeCount = 0;
    this.newChangePrice = 0.0;
    this.newChangeDesc = '';
    this.newChangeImg = '';
    this.info = ''
  }

  deleteProduct(product : ProductInterface){
    this.db.object('/products/' + product.id).remove()
  }

  sortProductsByPrice(){
    this.sortByPrice = !this.sortByPrice
    if(this.sortByPrice)
      this.products.sort( (p1,p2) => p2.price - p1.price )
    else
      this.products.sort( (p1,p2) => p1.price - p2.price )
  }

  sortProductsByName(){
    this.sortByName = !this.sortByName
    if(this.sortByName)
      this.products.sort( (p1,p2) => 0 - (p2.name > p1.name ? 1 : -1) )
    else
      this.products.sort( (p1,p2) => 0 - (p1.name > p2.name ? 1 : -1) )
  }

  sortProductsByCount(){
    this.sortByCount = !this.sortByCount
    if(this.sortByCount)
      this.products.sort( (p1,p2) => 0 - (p2.count > p1.count ? 1 : -1) )
    else
      this.products.sort( (p1,p2) => 0 - (p1.count > p2.count ? 1 : -1) )
  }

}
