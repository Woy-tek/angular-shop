import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { Obj } from '../produkty.component';
// import { EventEmitter } from 'protractor';
import { Type } from '@angular/compiler';
import { ProductInterface } from '../productInterface';
import { MessageServiceService } from 'src/app/message-service.service';
// import { Obj } from './produkty/produkty.component'

@Component({
  selector: 'hello-produkt',
  templateUrl: './produkt.component.html',
  styleUrls: ['./produkt.component.css']
  // ,providers: [MessageServiceService]
})
export class ProduktComponent implements OnInit {

  @Input() product : ProductInterface;
  @Output() toDelete = new EventEmitter<ProductInterface>();
  @Output() toAddToCart = new EventEmitter<ProductInterface>();

  constructor(private messageService: MessageServiceService) { }

  ngOnInit() {
    // this.sendMessage();
  }

  deleteProductComponent(product : ProductInterface){
    this.toDelete.emit(product);
  }

//   sendMessage(): void {
//     // if(this.product.count > 0){
//       this.messageService.sendMessage(this.product);
//       // this.product.count--;
//     // }
// }

  clearMessage(): void {
      // clear message
      this.messageService.clearMessage();
  }

  addToCart(){
    if(this.product.count > 0){
      this.toAddToCart.emit(this.product);
      this.messageService.sendMessage(this.product);
    }
  }

  // sendMessage(){
  //   console.log("AAA");
  //   this.messageService.sendMessage("LALALALLALALALAL");
  //   console.log("BBB");
  // }

  // clearMessage(){
  //   this.messageService.clearMessage();
  // }

  // addToCart(){
    // console.log(this.product.count);
    // if(this.product.count > 1){
      // this.sendMessage();
      // console.log(this.product.count);
      // this.product.count--;
    // }
  // }

}
