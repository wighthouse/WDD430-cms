import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender: string = '17';
  @ViewChild('subjectInput',{static: false}) subjectInputRef: ElementRef;
  @ViewChild('msgTextInput',{static: false}) msgTextInputRef: ElementRef;
  // @Output() addMessageEvent = new EventEmitter<Message>();

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }
  onSendMessage(){
    const msgId ="99";
    const msgSubject =this.subjectInputRef.nativeElement.value;
const msgMsgText =this.msgTextInputRef.nativeElement.value;
const msgSender =this.currentSender;
    const newMessage = new Message(msgId, msgSubject, msgMsgText, msgSender);
    console.log(newMessage);
    this.messageService.addMessage(newMessage);
  }

  onClear(){
    this.subjectInputRef.nativeElement.value ="";
    this.msgTextInputRef.nativeElement.value ="";
  }

}
