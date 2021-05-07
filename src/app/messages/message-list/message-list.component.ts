import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] =[
    new Message('1', 'Hello', 'Hi There! How are things going?', 'Maretta'),
    new Message('2', 'Help!', 'Can you help me on my assignment, please?', 'Maria'),
    new Message('3', 'Help!', 'I need some feedback on my prototype. Can you Zoom?', 'Maria'),
  ];
  constructor() { }

  ngOnInit(): void {
  }
onAddMessage(message:Message){
  this.messages.push(message);
}
}
