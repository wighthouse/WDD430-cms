import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Document} from 'src/app/documents/document.model'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  @ViewChild('f', {static: false}) form: NgForm;
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  id: string;

  constructor(private route: ActivatedRoute,
    private documentService: DocumentService,
    private router: Router) { }

  ngOnInit(): void  {
    this.route.params.subscribe (
      (params: Params) => {
      this.id = params['id'];
 if (!this.id) {
  this.editMode = false;
  return; 
}
this.originalDocument = this.documentService.getDocument(this.id);

 if(!this.originalDocument) {
   return;
 }
 this.editMode = true;
 this.document = JSON.parse(JSON.stringify(this.originalDocument));
  
}    
);

}
 


  onSubmit(form: NgForm) {
    // const value = form.value;
    // const newDocument = new Document();
    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, this.form.value)
    }else {
      this.documentService.addDocument(this.form.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
