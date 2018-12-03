import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ProductInterface } from './produkty/productInterface';

@Injectable({
  providedIn: 'root'
})

// @Injectable()
export class MessageServiceService {

  private subject = new Subject<ProductInterface>();
//   message$ = this.subject.asObservable();

    constructor(){
        
    }
 
    sendMessage(message: ProductInterface) {
        this.subject.next(message);
    }
 
    clearMessage() {
        this.subject.next();
    }
 
    getMessage(): Observable<ProductInterface> {
        return this.subject.asObservable();
    }

}
