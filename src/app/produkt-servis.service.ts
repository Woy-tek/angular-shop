import { Injectable } from '@angular/core';
import { ProductInterface } from './produkty/productInterface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProduktServisService {

  private productsUrl = 'api/products';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  products : Observable<ProductInterface[]>;
  cart : ProductInterface[] = [];

  constructor(private http: HttpClient) {
    this.products = this.getInMemoryData();
  }

  getInMemoryData() : Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(this.productsUrl);
  }

  // getDataFromFile(){
  //   this.copyTable(fakeProducts);
  // }

  // copyTable(tab : ProductInterface[]){
  //   tab.forEach(element => {
  //     this.products.push(element);
  //   });
  // }

  getProducts() : Observable<ProductInterface[]> {
    return this.products;
  }

  getProduct(id : number) : Observable<ProductInterface> {
    const url = this.productsUrl + '/' + id;
    return this.http.get<ProductInterface>(url).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<ProductInterface>(`getProduct id=${id}`))
    );
  }

  // getProduct(name : string, tab : ProductInterface[]) : ProductInterface{
  //   return tab.find(t => t.name == name);
  // }

  addProduct (product: ProductInterface): Observable<ProductInterface> {
    return this.http.post<ProductInterface>(this.productsUrl, product, this.httpOptions).pipe(
      tap((product: ProductInterface) => console.log('added hero w/ id=${product.id}')),
      catchError(this.handleError<ProductInterface>('addProduct'))
    );
  }

  addProductToTable(product : ProductInterface, tab : ProductInterface[]) : ProductInterface[]{
    let i = tab.findIndex(t => t.name == product.name);
    if(i > -1){
      tab[i].count++;
    }
    else tab.push(product);
    // this.cart.forEach(
    //   element => console.log(element.name)
    // )
    return tab;
  }

  updateProduct (product: ProductInterface): Observable<any> {
    return this.http.put(this.productsUrl, product, this.httpOptions).pipe(
      tap(_ => console.log(`updated product id=${product.id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteProduct (product: ProductInterface | number): Observable<ProductInterface> {
    const id = typeof product === 'number' ? product : product.id;
    const url = `${this.productsUrl}/${id}`;
 
    return this.http.delete<ProductInterface>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<ProductInterface>('deleteProduct'))
    );
  }

  deleteSingleProduct(product : ProductInterface, tab : ProductInterface[]) : ProductInterface[]{
    let i = tab.findIndex(t => t.name == product.name);
    if(i > -1){
      if(tab[i].count > 1) tab[i].count--;
      else tab.splice(+i,1);
    }
    return tab;
  }

  deleteProductFromTable(product : ProductInterface, tab : ProductInterface[]) : ProductInterface[]{
    let i = tab.findIndex(t => t.name == product.name);
    tab.splice(+i,1);
    return tab;
  }

  getCart(){
    return this.cart;
  }

  addToCart(product : ProductInterface) : void{
    this.addProductToTable(product,this.cart)
  }

  deleteFromCart(product : ProductInterface){
    this.deleteSingleProduct(product,this.cart)
    // this.addProduct(product,this.products)
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
