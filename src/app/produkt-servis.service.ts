import { Injectable } from '@angular/core';
import { ProductInterface } from './produkty/productInterface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class ProduktServisService {

  private url = '/products';

  private productsUrl = 'api/products';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  data : AngularFireList<ProductInterface>;
  // productKeys : any[];

  products : Observable<ProductInterface[]>;
  cart : ProductInterface[] = [];
  // productsObj : ProductInterface[] = []

  // productList : Observable<any[]>;

  dataSource : string = 'mongo'

  constructor(private http: HttpClient, private db : AngularFireDatabase) {
    // this.products = this.getInMemoryData();
    this.data = this.db.list<ProductInterface>(this.url);
    this.products = this.getFireBaseProducts();
    // this.getFirebaseKeys();
    // this.products.subscribe(
    //   data => {
    //     this.productsObj = data
    //   }
    // )
  }

  changeDataSource(){
    if(this.dataSource === 'firebase'){
      this.dataSource = 'mongo'
    }else{
      this.dataSource ='firebase'
    }
  }

  //------------------FIREBASE

  getFireBaseProducts() : Observable<ProductInterface[]>{
    return this.data.valueChanges();
  }

  // getFirebaseKeys(){

  //   this.data.snapshotChanges().subscribe(
  //     table => {
  //       this.productKeys = [];
  //       table.forEach(
  //         product => {
  //           this.productKeys.push(
  //             {
  //               name: product.payload.val().name,
  //               key: product.payload.key
  //             }
  //           )
  //         }
  //       )
  //     }
  //   )
  // }

  // getKey(name : string){
  //   this.productKeys.forEach(
  //     a => {
  //       if(a.name === name) return a.key;
  //     }
  //   )
  // }

  // getFireBaseProduct(name : string) : Observable<ProductInterface>{
  //   return this.db.object<ProductInterface>(this.url + this.getKey(name)).valueChanges();
  // }

  //------------------ /FIREBASE

  getInMemoryData() : Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(this.productsUrl);
  }

  getProducts() : Observable<ProductInterface[]> {
    return this.products;
  }

  getProduct(id : number) : Observable<ProductInterface> {

    return this.db.object<ProductInterface>(this.url + '/' + id).valueChanges();
    
    // const url = this.productsUrl + '/' + id;
    // return this.http.get<ProductInterface>(url).pipe(
    //   tap(_ => console.log(`fetched product id=${id}`)),
    //   catchError(this.handleError<ProductInterface>(`getProduct id=${id}`))
    // );
  }

  // addProduct (product: ProductInterface): Observable<ProductInterface> {
  //   return this.http.post<ProductInterface>(this.productsUrl, product, this.httpOptions).pipe(
  //     tap((product: ProductInterface) => console.log('added hero w/ id=${product.id}')),
  //     catchError(this.handleError<ProductInterface>('addProduct'))
  //   );
  // }

  addProductToTable(product : ProductInterface, tab : ProductInterface[]) : ProductInterface[]{
    let i = tab.findIndex(t => t.name == product.name);
    if(i > -1){
      tab[i].count++;
    }
    else tab.push(product);

    return tab;
  }

  updateProduct (product: ProductInterface): Promise<any> {

    return this.db.object(this.url + '/' + product.id)
      .update(product);

    // return this.http.put(this.productsUrl, product, this.httpOptions).pipe(
    //   tap(_ => console.log(`updated product id=${product.id}`)),
    //   catchError(this.handleError<any>('updateProduct'))
    // );
  }

  deleteProduct (product: ProductInterface): Promise<any> {
    
    return this.db.object(this.url + '/' + product.id)
    .remove();
    
    // const id = typeof product === 'number' ? product : product.id;
    // const url = `${this.productsUrl}/${id}`;
 
    // return this.http.delete<ProductInterface>(url, this.httpOptions).pipe(
    //   tap(_ => console.log(`deleted product id=${id}`)),
    //   catchError(this.handleError<ProductInterface>('deleteProduct'))
    // );
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

  clearCart(){
    this.cart = []
  }

  // increaseOnShutDown(){
  //   this.cart.forEach(
  //     product => {
  //       let p = this.productsObj.filter(t => t.id === product.id)[0]
  //       this.db.object('/products/' + product.id).update({count: product.count})
  //     }
  //   )
  // }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
