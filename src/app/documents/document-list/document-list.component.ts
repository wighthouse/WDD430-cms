import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'CIT 260 - Object Oriented Programming', 'This course is an introduction to object oriented programming using the Java programming language.', 'https://content.byui.edu/file/22c0260d-e1b7-43a2-8903-8d8f948041ee/4/syllabus.html', null),
    new Document('2', 'CIT 225 - Database Design & Development', 'The course deals with concepts and principles of database theory, application, and management technologies.', 'https://byui.instructure.com/courses/32446/assignments/syllabus', null),
    new Document('3', 'CIT 270 - Systems Security I', 'The purpose of this course is to provide the student with an overview of the field of Cyber Security.', 'https://byui.instructure.com/courses/2801/assignments/syllabus', null),
    new Document('4', 'CIT 240 - Networking', 'This course teaches general networking principles to provide an understanding of data communication protocols, the OSI model, network addressing, media, hardware, and software.', 'https://byui.instructure.com/courses/11267/assignments/syllabus', null),
    new Document('5', 'CIT 160 - Introduction to Programming', 'This course is an introduction to the basic concepts of computers and information technology.', 'https://byui.instructure.com/courses/35034/assignments/syllabus', null)

  ];
  constructor() { }

  ngOnInit(): void {
  }
  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
