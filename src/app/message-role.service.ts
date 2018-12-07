import { Injectable } from '@angular/core';
import { ProductInterface } from './produkty/productInterface';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageRoleService {
  private subject = new Subject<string>();
  
  constructor(){}
    
  sendMessage(message: string) {
      this.subject.next(message);
  }

  clearMessage() {
      this.subject.next();
  }

  getMessage(): Observable<string> {
      return this.subject.asObservable();
  }
}
