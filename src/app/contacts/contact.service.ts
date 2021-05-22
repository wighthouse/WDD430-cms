import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  private contacts: Contact [] =[];
  constructor() {
    this.contacts = MOCKCONTACTS;
   }
   getContacts() {
     return this.contacts.slice();
   }

  getContact(id: string) {
    
    for(let contact of this.contacts) {
      if (contact.id === id) {
        console.log(contact.id);
        return contact;
      }
         }
    return null;
  }
}


