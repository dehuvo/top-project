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

  user: Emp;              // 로그인한 사용자
  docs: Doc[];            // 문서 목록
  doc: Doc;               // 선택한 문서
  approvals: Approval[];  // 결재선
  aIndex: number;         // 결재선 인덱스
  viewList: boolean;      // 목록 보기
  editing: boolean;       // 작성/수정

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("loginData")) as Emp;
    this.getList();
  }

  // 목록 보기
  private getList() {
    this.docHttp.getList(this.user.id).subscribe(docs => {
      this.docs = docs;
      this.viewList = true;
    });
  }

  // 새 문서 작성
  private newDoc() {
    this.docHttp.getApprovals(this.user.deptId).subscribe(approvals => {
      this.approvals = approvals;
      this.doc = {
        author: this.user.id,     name: this.user.name,      // 작성자
        deptId: this.user.deptId, dept: this.user.deptName,  // 작성 부서
        count: approvals.length,  // 결재선 길이
        title: "", body: "",      // 제목, 본문
      } as Doc;
      this.viewList = false;
      this.editing = true;
    });
  }

  // 문서 보기/편집
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

  // 문서 저장/상신
  private save(title, body, publish, stat) {
    this.doc.title   = title.value;
    this.doc.body    = body.value;
    this.doc.publish = publish.checked;
    if (stat == 2) {
      this.doc.stat = stat;
    }
    const f = this.doc.id? "update": "insert";
    this.docHttp[f](this.doc).subscribe(() => this.getList());
  }

  // 문서 삭제
  private delete() {
    this.docHttp.delete(this.doc.id).subscribe(() => this.getList());
  }

  // 승인/반려
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
    this.docHttp.approve([as[i], more]).subscribe(() => this.getList());
  }
}