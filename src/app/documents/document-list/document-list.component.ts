import { Component,  OnDestroy,  OnInit, } from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  private subscription: Subscription;

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
  
  
  this.subscription = this.documentService.documentChangedEvent.subscribe(
    (documents: Document[]) => {
this.documents = documents;
    });
    this.documents= this.documentService.getDocuments();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
