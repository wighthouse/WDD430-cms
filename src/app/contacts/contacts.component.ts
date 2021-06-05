import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnDestroy {
selectedContact: Contact;
private conSelSub: Subscription;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.contactSelectedEvent.subscribe(
      (contact: Contact) => {
this.selectedContact = contact;
  }
    );
  }
  ngOnDestroy(): void {
    this.conSelSub.unsubscribe();
  }
}
