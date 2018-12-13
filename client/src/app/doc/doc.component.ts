import { Component, OnInit, Input } from '@angular/core';
import { Doc, Approval } from './doc.model';
import { Emp } from '../emp-dept.model';
import { DocHttpService} from './doc-http.service';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.css']
})
export class DocComponent implements OnInit {
  constructor(private docHttp: DocHttpService) {}

  user: Emp;            // 로그인한 사용자
  count: number;        // 전체 줄 수
  skip: number;         // 처음부터 건너뛸 줄 수
  off: number;          // skip % UNIT
  skips: number[];      // 한 블럭의 건너뛸 줄 수 배열
  docs: Doc[];
  doc: Doc;
  approvals: Approval[];
  viewList = false;
  editing = false;
  aIndex: number;

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("loginData")) as Emp;
    this.getList(0);
  }

  private gotoList() {
    this.getList(this.skip);
  }

  private getList(skip: number) {
    this.docHttp.getList(this.user.id).subscribe(docs => {
      this.docs = docs;
      this.viewList = true;
    });
  }

  private newDoc() {
    this.docHttp.getApprovals(this.user.deptId).subscribe(approvals => {
      this.approvals = approvals;
      this.doc = {
        author: this.user.id,
        name: this.user.name,
        deptId: this.user.deptId,
        dept: this.user.deptName,
        count: approvals.length,
        title: "", body: "",
      } as Doc;
      this.viewList = false;
      this.editing = true;
    });
  }

  private get(doc: Doc) {
    this.docHttp.get(doc.id).subscribe(data => {
      this.doc = doc;
      [this.doc.body, this.doc.approvals] = data;
      this.doc.count = data[1].length;
      this.editing = this.doc.author == this.user.id && this.doc.stat < 2;
      if (this.editing) {
        this.docHttp.getApprovals(this.user.deptId).subscribe(approvals => {
          this.approvals = approvals;
        });
      } else {
        this.aIndex = 0;
        for (const a of this.doc.approvals) {
          if (a.stat == 2 && a.approver == this.user.id) break;
          this.aIndex++;
        }
      }
      this.viewList = false;
    });
  }

  private save(title, body, publish, stat) {
    this.doc.title   = title.value;
    this.doc.body    = body.value;
    this.doc.publish = publish.checked;
    if (stat == 2) {
      this.doc.stat = stat;
    }
    const f = this.doc.id? "update": "insert";
    this.docHttp[f](this.doc).subscribe(() => this.gotoList());
  }

  private delete() {
    this.docHttp.delete(this.doc.id).subscribe(() => this.gotoList());
  }

  private approve(stat, memo) {
    const i = this.aIndex;          // 이 결재 인덱스
    const as = this.doc.approvals;  // 결재선
    let more: Approval = null;      // 앞/다음 결재
    if (stat == 1 && 0 < i) {       // 최초 반려가 아니면
      (more = as[i - 1]).stat = 2;  // 앞 결재를 대기로
    }
    if (stat == 3 && i < as.length - 1) {  // 최종 결재가 아니면
      (more = as[i + 1]).stat = 2;         // 다음 결재를 대기로
    }
    as[i].stat = stat;
    as[i].memo = memo;
    this.docHttp.approve([as[i], more]).subscribe(() => this.gotoList());
  }
}