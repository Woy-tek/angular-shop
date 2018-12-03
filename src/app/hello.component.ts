import { Component } from '@angular/core';

@Component({
  selector: 'hello-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class HelloComponent {
  title = 'hello-world';
  imie = 'Jan';
  nazwisko = 'Kowalski'

  tabString = ["Ala","ma","kota"]
  tabNumerow = [4,5,6,7]

  tabliczka(tabStr:string[], tabNum:number[]){

    for(let tab1 of tabStr){
      for(let tab2 in tabNum){
        console.log(tab1 + tabNum[tab2] + " ");
      }
      console.log("\n");
    }
  }

}
