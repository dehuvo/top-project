export interface Doc {
  id: number;
  title: string;          // 제목
  body: string;           // 본문
  publish: boolean;       // 공지 여부
  author: number;         // 기안자 id
  name: string;           // 기안자 이름
  dept: string;           // 기안부서 이름
  approvals: Approval[];  // 결재선
  stat: number;           // 상태: 1=작성중 2= 결재중 3= 결재완료
  ts: Date;
}

export interface Approval {
  id: number;
  docId: number;
  approver: number;  // 결재자 id
  name: string;      // 결재자 이름
  dept: string;      // 결재자 부서
  stat: number;      // 상태: 0=저장 1=반려 2=상신 3=결재
  memo: string;      // 반려 사유 등 메모
  ts: Date;
}