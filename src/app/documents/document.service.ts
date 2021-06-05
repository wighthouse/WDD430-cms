import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import {Document } from './document.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new Subject<Document>();
  documentChangedEvent = new Subject<Document[]>();
  private documents: Document[] = [];
  private maxDocumentId: number;

  constructor() { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    return this.documents.slice();
}
getDocument(id: string) {
  for (let document of this.documents) {
    if (document.id === id) {
      return document;
    }
    
  }
return null;
}
deleteDocument(document: Document) {
  if (!document) {
     return;
  }
  const pos = this.documents.indexOf(document);
  if (pos < 0) {
     return;
  }
  this.documents.splice(pos, 1);
  this.documentChangedEvent.next(this.documents.slice());
}
getMaxId(): number {
  let maxId: number = 0;

  for (let document of this.documents) {
    let currentId = +document.id;
    if (currentId > maxId) {
      maxId = currentId;
      console.log(maxId);
    }
      
    }
    return maxId;
  }

 addDocument(newDocument: Document) {
  if (!newDocument) {
    return;
 }
this.maxDocumentId++;
newDocument.id = this.maxDocumentId.toString();
this.documents.push(newDocument);
this.documentChangedEvent.next(this.documents.slice());
 } 

 updateDocument(originalDocument: Document, newDocument: Document)
{
  if (!originalDocument || !newDocument) {
    return;
  }
  const pos = this.documents.indexOf(originalDocument);
  if (pos < 0) {
    return;
  }
  newDocument.id = originalDocument.id;
  this.documents[pos] =newDocument;
  this.documentChangedEvent.next(this.documents.slice());
}

}


