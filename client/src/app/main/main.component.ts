import { Component, OnInit } from '@angular/core';
import { NoteHttpService } from '../note/note-http.service';
import { DocHttpService } from '../doc/doc-http.service';
import { Note } from '../note/note.model';
import { Doc } from '../doc/doc.model';
import { Emp } from '../emp-dept.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor(private docHttp: DocHttpService,
              private noteHttp: NoteHttpService) {}

  notes: Note[];
  docs: Doc[];

  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem("loginData")) as Emp;
    this.docHttp.getList(user.id, 5).subscribe(data => this.docs = data);
    this.noteHttp.getList(0, 5).subscribe(data => this.notes = data[1]);
  }
}