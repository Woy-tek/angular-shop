import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductInterface } from '../productInterface';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  @Output() newProduct = new EventEmitter<ProductInterface>();
  product : ProductInterface;

  constructor() { 
    // this.product = {
    //   name: "Burak",
    //   count: 4,
    //   price: 2.5,
    //   description: "Dobry",
    //   img: "http://rs736.pbsrc.com/albums/xx7/Richishot2/DarthVader1.jpg~c200"
    // }
  }

  ngOnInit() {
  }

  addNewProduct(){
    this.newProduct.emit(this.product);
  }

}
