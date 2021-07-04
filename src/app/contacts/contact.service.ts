import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';



@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new Subject<Contact>();
  contactChangedEvent = new Subject<Contact []>();
  private contacts: Contact [] =[];
  private maxContactId: number;

  constructor(private http: HttpClient) {
    this.http.get('http://localhost:3000/contacts')
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
    this.http.put('http://localhost:3000/contacts',
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
  // deleteContact(contact: Contact) {
  //   if (!contact) {
  //      return;
  //   }
  //   const pos = this.contacts.indexOf(contact);
  //   if (pos < 0) {
  //      return;
  //   }
  //   this.contacts.splice(pos, 1);
  //   this.storeContacts();
  // }

  deleteContact(contact: Contact) {

    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex(c => c.id === contact.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.contacts.sort((a, b) => a.name < b.name ? -1 : 0);
        this.contactChangedEvent.next(this.contacts.slice());
        }
      );
  }


  getMaxId(): number {
    let maxId: number = 0;

    for (let contact of this.contacts) {
      let currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;

      }

      }console.log(maxId);
      return maxId;
    }

  //  addContact(newContact: Contact) {
  //   if (!newContact) {
  //     return;
  //  }
  // this.maxContactId++;
  // newContact.id = this.maxContactId.toString();
  // this.contacts.push(newContact);
  // this.storeContacts();

  //  }

  addContact(contact: Contact) {
    if (!contact) {
      return;
    }

    // make sure id of the new contact is empty
    contact.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
      contact,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new contact to contacts
          this.contacts.push(responseData.contact);
          this.contacts.sort((a, b) => a.name < b.name ? -1 : 0);
        this.contactChangedEvent.next(this.contacts.slice());
        }
      );
  }


  //  updateContact(originalContact: Contact, newContact: Contact)
  // {
  //   if (!originalContact || !newContact) {
  //     return;
  //   }
  //   const pos = this.contacts.indexOf(originalContact);
  //   if (pos < 0) {
  //     return;
  //   }
  //   newContact.id = originalContact.id;
  //   this.contacts[pos] =newContact;
  //   this.storeContacts();
  // }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === originalContact.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new contact to the id of the old contact
    newContact.id = originalContact.id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/contacts/' + originalContact.id,
      newContact, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          this.contacts.sort((a, b) => a.name < b.name ? -1 : 0);
        this.contactChangedEvent.next(this.contacts.slice());
        }
      );
  }

}


