import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit, OnDestroy {
@Input() message: Message;
 messageSender: string;
 subscription: Subscription;


  constructor(private contactService: ContactService) { }

  ngOnInit() {
    const showSender = () => {
    const contact:Contact | null = this.contactService.getContact(this.message.sender);
    this.messageSender = contact?.name ?? 'Unknown contact';
    }

    showSender();
    this.subscription =this.contactService.contactChangedEvent.subscribe(showSender);
  }


ngOnDestroy() {
    this.subscription.unsubscribe();

  }}
