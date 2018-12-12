import { Component, OnInit, Input } from '@angular/core';
import { Doc, Approval } from './doc.model';
import { Emp } from '../emp-dept.model';
import { DocHttpService} from './doc-http.service';

const [ROWS, PAGES] = [5, 5];

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.css']
})
export class DocComponent implements OnInit {
  constructor(private docHttp: DocHttpService) {}

  UNIT = ROWS * PAGES;
  ROWS = ROWS;
  skip: number;
  off: number;
  count: number;
  docs: Doc[];
  skips: number[];
  doc: Doc;
  user: Emp;
  viewList = false;
  editing = false;
  approvable = false;
  aCount: number;
  memo: string;

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("loginData")) as Emp;
    this.getList(0);
  }

  private gotoList() {
    this.getList(this.skip);
  }

  private getList(skip: number) {
    this.docHttp.getList(this.user.id, skip, ROWS).subscribe(list => {
      [this.count, this.docs] = list;
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

  private get(doc: Doc) {
    this.docHttp.get(doc.id).subscribe(data => {
      [(this.doc = doc).body, this.doc.approvals] = data;
      this.aCount = data[1].length;
      this.editing = this.doc.author == this.user.id && this.doc.stat < 2;
      if (this.editing) {
        this.docHttp.getApprovals(this.user.deptId).subscribe(approvals => {
          this.doc.approvals = approvals;
        });
      } else {
        this.approvable = false;
        for (const a of this.doc.approvals) {
          if (a.stat == 2 && a.approver == this.user.id) {
            this.approvable = true;
            break;
          }
        }
      }
      this.viewList = false;
    });
  }

  private newDoc() {
    this.docHttp.getApprovals(this.user.deptId).subscribe(approvals => {
      this.doc = {
        author: this.user.id,
        name: this.user.name,
        dept: this.user.deptName,
        title: "", body: "",
        approvals: approvals,
      } as Doc;
      this.aCount = approvals.length;
      this.viewList = false;
      this.editing = true;
    });
  }

  private delete() {
    this.docHttp.delete(this.doc.id).subscribe(() => this.gotoList());
  }

  private save(title, body, publish, stat) {
    this.doc.title = title.value;
    this.doc.body = body.value;
    this.doc.publish = publish.checked;
    if (this.doc.id) {
      this.docHttp.update(this.doc).subscribe(() => {
        this.doc.approvals[0].stat = stat;
        this.docHttp.updateAppr(this.doc.approvals[0]).subscribe(() => {
          this.gotoList();
        });
      });
    } else {
      this.doc.approvals.length = this.aCount;
      this.docHttp.insert(this.doc).subscribe(id => {
        this.doc.id = id;
        for (const a of this.doc.approvals) {
          a.docId = id;
        }
        this.doc.approvals[0].stat = stat;
        this.docHttp.inserts(this.doc.approvals).subscribe(() => {
          this.gotoList();
        });
      });
    }
  }

  private cancel() {
    this.gotoList();
  }
}