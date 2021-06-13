import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact} from 'src/app/contacts/contact.model'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  @ViewChild('f', {static: false}) form: NgForm;
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[]= [];
  editMode: boolean = false;
  id: string;

  constructor(private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe (
      (params: Params) => {
      this.id = params['id'];
 if (!this.id) {
  this.editMode = false;
  return; 
}
this.originalContact = this.contactService.getContact(this.id);

 if(!this.originalContact) {
   return;
 }
 this.editMode = true;
 this.contact = JSON.parse(JSON.stringify(this.originalContact));
 
if (this.contact.group){
  this.groupContacts= JSON.parse(JSON.stringify(this.originalContact.group));
} 
}    
);

}
 
  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Contact(value.id, value.name, value.email, value.phone, value.imageUrl, this.groupContacts)
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
      console.log(newContact);
    }else {
      this.contactService.addContact(newContact);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  isInvalidContact(newContact: Contact) {
    if(!newContact) {
      return true;
    }
    if(this.contact&&newContact.id===this.contact.id){
      return true;
    }
    for(let i = 0; i< this.groupContacts.length; i++){
      if(newContact.id===this.groupContacts[i].id){
        return true;
      }
    }
    return false;
  }
  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact){
       return;
    }
    this.groupContacts.push(selectedContact);
 }
 
onRemoveItem(index: number) {
  if (index < 0 || index >= this.groupContacts.length) {
     return;
  }
  this.groupContacts.splice(index, 1);
}

}
