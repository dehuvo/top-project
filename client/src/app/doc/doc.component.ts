import { Component, OnInit, Input } from '@angular/core';
import { DocHttpService} from './doc-http.service';
import { Doc, Approval } from './doc.model';
import { Emp } from '../emp-dept.model';

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
  approvals: Approval[];  // 전결 메뉴
  aIndex: number;         // 결재선에서 결재자 인덱스
  viewList: boolean;      // 문서 목록을 볼 것인가?
  editing: boolean;       // 문서를 작성/수정할 것인가?

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("loginData")) as Emp;
    this.getList();
  }

  // 문서 목록 보기
  private getList() {
    this.docHttp.getList(this.user.id, 0).subscribe(docs => {
      this.docs = docs;
      this.viewList = true;
    });
  }

  // 새 문서 작성
  private newDoc() {
    this.docHttp.getApprovals(this.user.deptId).subscribe(approvals => {
      this.approvals = approvals;  // 전결 메뉴
      this.doc = {
        author: this.user.id,     name: this.user.name,      // 작성자
        deptId: this.user.deptId, dept: this.user.deptName,  // 작성 부서
        count: approvals.length,   // 결재선 길이
        title: "", body: "",       // 제목, 본문
      } as Doc;
      this.editing = true;
      this.viewList = false;
    });
  }

  // 문서 보기/편집 (선택한 문서)
  private get(doc: Doc) {
    this.docHttp.get(doc.id).subscribe(data => {
      this.doc = doc;                              // 선택한 문서
      [this.doc.body, this.doc.approvals] = data;  // [본문, 결재선]
      this.doc.count = data[1].length;             // 결재선 길이
      this.editing = this.doc.author == this.user.id && this.doc.stat < 2;
      if (this.editing) {              // 작성중인가?
        this.docHttp.getApprovals(this.user.deptId).subscribe(approvals => {
          this.approvals = approvals;  // 전결 메뉴
          this.viewList = false;
        });
      } else {
        this.aIndex = 0;  // 결재자 인덱스 -- 로그인한 결재자를 찾는다
        for (const a of this.doc.approvals) {
          if (a.stat == 2 && a.approver == this.user.id) break;
          this.aIndex++;
        }
        this.viewList = false;
      }
    });
  }

  // 문서 저장/상신 (제목, 본문, 공지 여부, 0=저장 2=상신)
  private save(title, body, publish, stat): void {
    if (this.focus(title, "title") && this.focus(body, "body")) {
      this.doc.publish = publish.checked;
      if (stat == 2) {
        this.doc.stat = stat;  // 상신
      }
      const f = this.doc.id? "update": "insert";
      this.docHttp[f](this.doc).subscribe(() => this.getList());
    }
  }

  // 노드 값이 있으면 값을 넣고, 없으면 포커스 (노드, 필드 이름)
  private focus(node, field: string): boolean {
    if (node.value) {
      this.doc[field] = node.value;  // 값이 있으면 그 값을 취하고
      return true;
    } else {
      node.focus();       // 값이 없으면 그 입력 창에 커서를 넣는다
      return false;
    }
  }

  // 문서 삭제
  private delete() {
    this.docHttp.delete(this.doc.id).subscribe(() => this.getList());
  }

  // 승인/반려 (3=승인 1=반려, 승인/반려 의견)
  private approve(stat, memo) {
    const     i = this.aIndex;         // 이 결재 인덱스
    const aList = this.doc.approvals;  // 결재선
    let more: Approval = null;         // 앞/다음 결재
    if (stat == 1 && 0 < i) {                        // 최초 반려가 아니면
      (more = aList[i - 1]).stat = 2;                // 앞 결재를 대기로
    } else if (stat == 3 && i < aList.length - 1) {  // 최종 결재가 아니면
      (more = aList[i + 1]).stat = 2;                // 다음 결재를 대기로
    }
    aList[i].stat = stat;
    aList[i].memo = memo;
    this.docHttp.approve([aList[i], more]).subscribe(() => this.getList());
  }
}