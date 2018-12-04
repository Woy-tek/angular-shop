import { Component, OnInit, Input } from '@angular/core';
import { ProductInterface } from 'src/app/produkty/productInterface';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  @Input() product : ProductInterface;

  constructor() { }

  ngOnInit() {
    console.log(this.product)
  }

}
