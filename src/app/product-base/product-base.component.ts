import { Component, OnInit } from '@angular/core';
import { ProduktServisService } from '../produkt-servis.service';
import { ProductInterface } from '../produkty/productInterface';

@Component({
  selector: 'app-product-base',
  templateUrl: './product-base.component.html',
  styleUrls: ['./product-base.component.css']
})
export class ProductBaseComponent implements OnInit {

  products : ProductInterface[];
  seen : string;

  changeName : string;
  changeCount : number;
  changePrice : number;
  changeDesc : string;

  constructor(private productService : ProduktServisService ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      anwser => this.products = anwser
    )
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

  }

  confirmChanges(product : ProductInterface){
    this.seen = '';
  }

  comeBack(){
    this.seen = '';
  }

}
