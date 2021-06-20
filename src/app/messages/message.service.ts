import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  private messages: Message []=[];
  private maxMessageId: number;
  constructor(private http: HttpClient) { 
    this.http.get('https://wdd430-cms-f90de-default-rtdb.firebaseio.com/messages.json')
    .subscribe((messages: Message[]) => {
      this.messages = messages;
      this.maxMessageId = this.getMaxId();
      // this.messages.sort((a, b) => a.name < b.name ? -1 : 0);
      this.messageChangedEvent.next(this.messages.slice());
        console.log(this.messages);
        return messages;
    },
    (error: any) =>{
      console.log(error);
    }
    );
    
  }

  storeMessages() {
    const messages = JSON.stringify(this.messages)
    this.http.put('https://wdd430-cms-f90de-default-rtdb.firebaseio.com/messages.json', 
    messages).subscribe(response => {
      this.messageChangedEvent.next(this.messages.slice());
        console.log(response);
       
    });

}

   getMessages() {
    return this.messages.slice();
  }

  getMessage(id: string) {
   for (let message of this.messages){
     if (message.id === id) {
       return message;
     }
        }
return null;
   }
   
   addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages();
   
   
  }

  getMaxId(): number {
    let maxId: number = 0;
  
    for (let message of this.messages) {
      let currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
        console.log(maxId);
      }
        
      }
      return maxId;
    }
}
