import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductInterface } from '../produkty/productInterface';
import { ProduktServisService } from '../produkt-servis.service';

@Component({
  selector: 'app-potwierdzenie',
  templateUrl: './potwierdzenie.component.html',
  styleUrls: ['./potwierdzenie.component.css']
})
export class PotwierdzenieComponent implements OnInit {

  formularz : FormGroup;
  zatwierdzone : boolean = false;

  order : Order;

  constructor(private formBuilder : FormBuilder, private productService : ProduktServisService) { }

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
      this.order = {
        firstName: this.formularz.controls['firstName'].value,
        lastName: this.formularz.controls['lastName'].value,
        email: this.formularz.controls['email'].value,
        address: this.formularz.controls['address'].value,
        cart: this.productService.getCart()
      }
    }
}

}

export interface Order{
  firstName : string;
  lastName: string;
  email : string;
  address : string;
  cart: ProductInterface[];
}
