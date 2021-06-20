import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new Subject<Contact>();
  contactChangedEvent = new Subject<Contact []>();
  private contacts: Contact [] =[];
  private maxContactId: number;
  
  constructor(private http: HttpClient) { 
    this.http.get('https://wdd430-cms-f90de-default-rtdb.firebaseio.com/contacts.json')
    .subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
      this.maxContactId = this.getMaxId();
      this.contacts.sort((a, b) => a.name < b.name ? -1 : 0);
      this.contactChangedEvent.next(this.contacts.slice());
        console.log(this.contacts);
        return contacts;
    },
    (error: any) =>{
      console.log(error);
    }
    );
    
  }

  storeContacts() {
    const contacts = JSON.stringify(this.contacts)
    this.http.put('https://wdd430-cms-f90de-default-rtdb.firebaseio.com/contacts.json', 
    contacts).subscribe(response => {
      this.contactChangedEvent.next(this.contacts.slice());
        console.log(response);
       
    });

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
  deleteContact(contact: Contact) {
    if (!contact) {
       return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
       return;
    }
    this.contacts.splice(pos, 1);
    this.storeContacts();
  }
  getMaxId(): number {
    let maxId: number = 0;
  
    for (let contact of this.contacts) {
      let currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
        console.log(maxId);
      }
        
      }
      return maxId;
    }
  
   addContact(newContact: Contact) {
    if (!newContact) {
      return;
   }
  this.maxContactId++;
  newContact.id = this.maxContactId.toString();
  this.contacts.push(newContact);
  this.storeContacts();
  
   } 
  
   updateContact(originalContact: Contact, newContact: Contact)
  {
    if (!originalContact || !newContact) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] =newContact;
    this.storeContacts();
  }
  

}


