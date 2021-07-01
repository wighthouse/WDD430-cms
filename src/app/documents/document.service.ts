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
    this.http.get('http://localhost:3000/documents')
    .subscribe((documents: Document[]) => {
      this.documents = documents;
      this.maxDocumentId = this.getMaxId();
      this.documents.sort((a, b) => a.name < b.name ? -1 : 0);
      this.documentChangedEvent.next(this.documents.slice());
        console.log(this.documents);
        return documents;
    },
    (error: any) =>{
      console.log(error);
    }
    );

  }

  storeDocuments() {
    const documents = JSON.stringify(this.documents)
    this.http.put('http://localhost:3000/documents',
    documents).subscribe(response => {
      this.documentChangedEvent.next(this.documents.slice());
        console.log(response);

    });

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
// deleteDocument(document: Document) {
//   if (!document) {
//      return;
//   }
//   const pos = this.documents.indexOf(document);
//   if (pos < 0) {
//      return;
//   }
//   this.documents.splice(pos, 1);
//   this.storeDocuments();
// }


deleteDocument(document: Document) {

  if (!document) {
    return;
  }

  const pos = this.documents.findIndex(d => d.id === document.id);

  if (pos < 0) {
    return;
  }

  // delete from database
  this.http.delete('http://localhost:3000/documents/' + document.id)
    .subscribe(
      (response: Response) => {
        this.documents.splice(pos, 1);
        this.documents.sort((a, b) => a.name < b.name ? -1 : 0);
      this.documentChangedEvent.next(this.documents.slice());
      }
    );
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

//  addDocument(newDocument: Document) {
//   if (!newDocument) {
//     return;
//  }
// this.maxDocumentId++;
// newDocument.id = this.maxDocumentId.toString();
// this.documents.push(newDocument);
// this.storeDocuments();
//  }


addDocument(document: Document) {
  if (!document) {
    return;
  }

  // make sure id of the new Document is empty
  document.id = '';

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // add to database
  this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
    document,
    { headers: headers })
    .subscribe(
      (responseData) => {
        // add new document to documents
        this.documents.push(responseData.document);
        this.documents.sort((a, b) => a.name < b.name ? -1 : 0);
      this.documentChangedEvent.next(this.documents.slice());
      }
    );
}

//  updateDocument(originalDocument: Document, newDocument: Document)
// {
//   if (!originalDocument || !newDocument) {
//     return;
//   }
//   const pos = this.documents.indexOf(originalDocument);
//   if (pos < 0) {
//     return;
//   }
//   newDocument.id = originalDocument.id;
//   this.documents[pos] =newDocument;
//   this.storeDocuments();
// }




updateDocument(originalDocument: Document, newDocument: Document) {
  if (!originalDocument || !newDocument) {
    return;
  }

  const pos = this.documents.findIndex(d => d.id === originalDocument.id);

  if (pos < 0) {
    return;
  }

  // set the id of the new Document to the id of the old Document
  newDocument.id = originalDocument.id;

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // update database
  this.http.put('http://localhost:3000/documents/' + originalDocument.id,
    newDocument, { headers: headers })
    .subscribe(
      (response: Response) => {
        this.documents[pos] = newDocument;
        this.documents.sort((a, b) => a.name < b.name ? -1 : 0);
      this.documentChangedEvent.next(this.documents.slice());
      }
    );
}

}
