import { Injectable } from '@angular/core';
import { ProductInterface } from './produkty/productInterface';
import { element } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  currentPage : number;
  itemsCount : number;

  constructor() { 
    this.currentPage = 0;
    this.itemsCount = 4;
  }

  setPage(page : number){
    this.currentPage = page;
  }

  getPagesInit(tab : ProductInterface[]) : number[] {
    let count = tab.length / this.itemsCount;
    let resultTab = [];
    for(let i = 0; i < count; i++){
      resultTab.push(i+1);
    }
    return resultTab;
  }

  getCurrentPages(tab : ProductInterface[]) : ProductInterface[] {
    let position = this.currentPage * this.itemsCount;
    return tab.slice(position, position + this.itemsCount);
  }

  getCurrentPagesFiltered(tab : ProductInterface[], min : number, max : number) : ProductInterface[] {
    let position = this.currentPage * this.itemsCount;
    return tab.slice(position, position + this.itemsCount);
  }

  // filterTab(tab : ProductInterface[], min : number, max : number){
  //   let resultTab = [];
  //   tab.forEach(element => {
  //     if(element.price > min && element.price < max){
  //       resultTab.push(element);
  //     }
  //   })

  //   return resultTab;
  // }

  // getPagesInitWithFilter(tab : ProductInterface[], min : number, max : number) : number[] {
  //   let count = tab.length / this.itemsCount;
  //   let resultTab = [];
  //   for(let i = 0; i < count; i++){
  //     resultTab.push(i+1);
  //   }
  //   return resultTab;
  // }

}
