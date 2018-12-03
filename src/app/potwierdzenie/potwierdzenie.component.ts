import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-potwierdzenie',
  templateUrl: './potwierdzenie.component.html',
  styleUrls: ['./potwierdzenie.component.css']
})
export class PotwierdzenieComponent implements OnInit {

  formularz : FormGroup;
  zatwierdzone : boolean = false;

  person : Person;

  constructor(private formBuilder : FormBuilder) { }

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
      this.person = {
        firstName: this.formularz.controls['firstName'].value,
        lastName: this.formularz.controls['lastName'].value,
        email: this.formularz.controls['email'].value,
        address: this.formularz.controls['address'].value,
      }
    }
}

}

export interface Person{
  firstName : string;
  lastName: string;
  email : string;
  address : string;
}
