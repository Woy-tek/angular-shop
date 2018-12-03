import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ProductInterface } from './produkty/productInterface';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  constructor() { }

  createDb(){
    const products = [
      {
        id: 1,
        name: "Burak",
        count : 4,
        price : 2.5,
        description : "Dobry",
        img : "http://rs736.pbsrc.com/albums/xx7/Richishot2/DarthVader1.jpg~c200"
      },
      {
        id: 2,
        name: "Cebula",
        count : 1,
        price : 7.5,
        description : "Bardzo Dobry",
        img : "http://rs736.pbsrc.com/albums/xx7/Richishot2/DarthVader1.jpg~c200"
      },
      {
        id: 3,
        name: "Zioła",
        count : 2,
        price : 2.4,
        description : "Nie Dobry",
        img : "http://rs736.pbsrc.com/albums/xx7/Richishot2/DarthVader1.jpg~c200"
      },
      {
        id: 4,
        name: "Pomarańcza",
        count : 8,
        price : 8.5,
        description : "Dobry",
        img : "http://rs736.pbsrc.com/albums/xx7/Richishot2/DarthVader1.jpg~c200"
      },
      {
        id: 5,
        name: "Mniszek",
        count : 7,
        price : 12.5,
        description : "Dobry",
        img : "http://rs736.pbsrc.com/albums/xx7/Richishot2/DarthVader1.jpg~c200"
      },
      {
        id: 6,
        name: "Pieczarki",
        count : 2,
        price : 2.9,
        description : "Słabo Dobry",
        img : "http://rs736.pbsrc.com/albums/xx7/Richishot2/DarthVader1.jpg~c200"
      },
      {
        id: 7,
        name: "Muchomor",
        count : 1,
        price : 8.5,
        description : "Dobry",
        img : "http://rs736.pbsrc.com/albums/xx7/Richishot2/DarthVader1.jpg~c200"
      },
      {
        id: 8,
        name: "Chipsy",
        count : 3,
        price : 33.5,
        description : "No, w sumie Dobry",
        img : "http://rs736.pbsrc.com/albums/xx7/Richishot2/DarthVader1.jpg~c200"
      }
    ];
    
    return {products};
  }

  genId(products: ProductInterface[]): number {
    return products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 1;
  }

}
