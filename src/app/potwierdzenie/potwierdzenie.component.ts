import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductInterface } from '../produkty/productInterface';
import { ProduktServisService } from '../produkt-servis.service';
import { Order, OrderService } from '../order.service';
import { Router } from '@angular/router';
import { MessageServiceService } from '../message-service.service';

@Component({
  selector: 'app-potwierdzenie',
  templateUrl: './potwierdzenie.component.html',
  styleUrls: ['./potwierdzenie.component.css']
})
export class PotwierdzenieComponent implements OnInit {

  formularz : FormGroup;
  zatwierdzone : boolean = false;
  info : string;

   order : Order;

  constructor(private formBuilder : FormBuilder, 
    private productService : ProduktServisService,
    private orderService : OrderService,
    private router : Router,
    private messageService : MessageServiceService) { }

  ngOnInit() {
    this.formularz = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]]
    })
  }

  get f() { return this.formularz.controls; }

  onSubmit() {
    this.zatwierdzone = true;

    // stop here if form is invalid
    if (this.formularz.invalid) {
        return;
    }else{
      this.addNewOrder();
    }
  }
  
  addNewOrder(){
    this.order = {
      id: '',
      name: this.formularz.controls['firstName'].value,
      surname: this.formularz.controls['lastName'].value,
      address: this.formularz.controls['address'].value,
      email: this.formularz.controls['email'].value,
      status: 'oczekujące',
      dataIn: this.orderService.getData(),
      dataOut: '',
      products: this.productService.getCart(),
      productsStatus: this.orderService.setProductStatus(this.productService.getCart())
      // firstName: this.formularz.controls['firstName'].value,
    }

    this.orderService.addOrder(this.order)
    this.productService.clearCart()
    this.messageService.sendMessage({
      id: '',
      name: '',
      count: 0,
      price: -1,
      description: '',
      img: ''
    })
    this.info = "Zamówienie zostało przyjęte."
    this.router.navigate(['/products'])
  }

}
