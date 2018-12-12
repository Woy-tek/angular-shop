import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionMessageService {

  messages: Subject<any>;

  constructor(private wsService : WebsocketService) {
    this.messages = <Subject<any>>wsService
      .connect()
      .pipe((response: any): any => {
        return response;
      });
   }

   sendMsg(msg){
    this.messages.next(msg);
   }

}
