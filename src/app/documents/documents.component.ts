import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from './document.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit, OnDestroy {
selectedDocument: Document;
private docSelSub: Subscription;

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documentService.documentSelectedEvent.subscribe(
      (document: Document) => {
this.selectedDocument = document;
  }
    );
  }
  ngOnDestroy(): void {
    this.docSelSub.unsubscribe();
  }
}
