import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new Subject<Document>();
  documentChangedEvent = new Subject<Document[]>();
  private documents: Document[] = [];
  private maxDocumentId: number;

  constructor(private http: HttpClient) { 
    this.http.get('https://wdd430-cms-f90de-default-rtdb.firebaseio.com/documents.json')
    .subscribe((documents: Document[]) => {
      this.documents = documents;
      this.maxDocumentId = this.getMaxId();
      console.log(this.documents[2].name);
      this.documents =this.documents.sort((a, b) => a.name > b.name ? 1 : 0);
      this.documentChangedEvent.next(this.documents.slice());
        console.log(this.documents);
        return documents;
    },
    (error: any) =>{
      console.log(error);
    }
    );
    
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


