import { Component, OnInit, } from '@angular/core';
import { Emp } from '../emp-dept.model';
import { Note } from './note.model';
import { NoteHttpService } from './note-http.service';

const [ROWS, PAGES] = [5, 5];  // [한 페이지의 줄 수, 한 블럭의 페이지 수]

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  constructor(private noteHttp: NoteHttpService) {}

  UNIT = ROWS * PAGES;  // 한 블럭의 줄 수
  ROWS = ROWS;          // 한 페이지의 줄 수
  user: Emp;            // 로그인한 사용자
  count: number;        // 전체 줄 수
  skip: number;         // 처음부터 건너뛸 줄 수
  off: number;          // skip % UNIT
  skips: number[];      // 한 블럭의 건너뛸 줄 수 배열
  notes: Note[];        // 한 페이지의 글 배열
  note: Note;           // 선택한 글
  viewList = false;     // 목록을 볼 것인가?
  editing = false;      // 작성/수정할 것인가?

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("user-emp")) as Emp;
    this.getList(0);
  }

  // 목록으로 이동
  private gotoList() {
    this.getList(this.skip);
  }

   // 목록으로 이동 (건너뛸 줄 수)
  private getList(skip: number) {
    this.noteHttp.getList(skip, ROWS).subscribe(list => {
      [this.count, this.notes] = list;
      this.skip = skip;
      this.off = skip % this.UNIT;
      const skipsStart = skip - this.off;
      const skipsEnd = Math.min(this.count, skipsStart + this.UNIT);
      this.skips = [];
      for (let s = skipsStart; s < skipsEnd; s += ROWS) {
        this.skips.push(s);
      }
      this.viewList = true;
    });
  }

  // 글 보기로 이동 (글 id)
  private get(id: number) {
    this.noteHttp.get(id).subscribe(note => {
      this.note = note;
      this.viewList = false;
      this.editing = false;
    });
  }

  // 새글 쓰기로 이동
  private newNote() {
    const [author, name] = [this.user.id, this.user.name];
    this.note = { author, name, title: "", body: "" } as Note;
    this.editing = true;
    this.viewList = false;
  }

  // 삭제
  private delete() {
    this.noteHttp.delete(this.note.id).subscribe(() => this.gotoList());
  }

  // 저장
  private save(title, body) {
    if (!title.value) {
      title.focus();
    } else if (!body.value) {
      body.focus();
    } else {
      this.note.title = title.value;
      this.note.body = body.value;
      const f = this.note.id? "update": "insert";
      this.noteHttp[f](this.note).subscribe(() => this.gotoList());
    }
  }

  // 취소
  private cancel() {
    this.editing = false;
    if (!this.note.id) {
      this.gotoList();
    }
  }
}