import { Component, OnInit, } from '@angular/core';
import { Emp } from '../emp-dept.model';
import { Note } from './note.model';
import { NoteHttpService } from './note-http.service';

const [ROWS, BLOCKS] = [5, 5];

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  constructor(private noteHttp: NoteHttpService) {}

  UNIT = ROWS * BLOCKS;
  ROWS = ROWS;
  skip: number;
  off: number;
  count: number;
  notes: Note[];
  skips: number[];
  note: Note;
  user: Emp;
  viewList = false;
  editing = false;

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("loginData")) as Emp;
    this.getList(0);
  }

  private gotoList() {
    this.getList(this.skip);
  }

  private getList(skip: number) {
    this.noteHttp.getList(skip, ROWS).subscribe(list => {
      [this.count, this.notes] = list;
      this.skip = skip;
      this.off = skip % this.UNIT;
      this.skips = [];
      const skipsStart = skip - this.off;
      const skipsEnd = Math.min(this.count, skipsStart + this.UNIT);
      for (let s = skipsStart; s < skipsEnd; s += ROWS) {
        this.skips.push(s);
      }
      this.viewList = true;
    });
  }

  private get(id: number) {
    this.noteHttp.get(id).subscribe(note => {
      this.note = note;
      this.viewList = false;
      this.editing = false;
    });
  }

  private newNote() {
    const [author, name] = [this.user.id, this.user.name];
    this.note = { author, name, title: "", body: "" } as Note;
    this.viewList = false;
    this.editing = true;
  }

  private delete() {
    this.noteHttp.delete(this.note.id).subscribe(() => this.gotoList());
  }

  private save(title: string, body: string) {
    this.note.title = title;
    this.note.body = body;
    if (this.note.id) {
      this.noteHttp.update(this.note).subscribe(() => this.gotoList());
    } else {
      this.noteHttp.insert(this.note).subscribe(() => this.gotoList());
    }
  }

  private cancel() {
    this.editing = false;
    // if (!this.note.id) {
      this.gotoList();
    // }
  }
}