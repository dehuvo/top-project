import { Component } from '@angular/core';
import { EmpDeptHttpService } from './emp-dept-http.service';
import { Emp } from './emp-dept.model';

const EMPTY_EMP = { id:0, code:"", name:"", phone:"", email:"" } as Emp;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: EmpDeptHttpService) {}

  emp: Emp  = Object.assign({}, EMPTY_EMP);  // 로그인 사용자
  depts: object[][];  // [부서 id, 부서 이름] 배열
  editing   = false;  // 사용자 정보 작성/수정 중
  okUpdate  = false;  // 사용자 정보 수정 전에 비밀번호 확인되었음
  pwError   = false;  // 비밀번호가 맞지 않거나 밉력한 두 비밀번호가 다름
  codeError = false;  // 이미 사용 중인 사용자 아이디 에러

  signin(code, pw) {
    if (this.focus(code, null) && this.focus(pw, null)) {
      this.http.isPwOk(code.value, pw.value).subscribe(ok => {
        if (this.pwError = !ok) {
          pw.focus();
        } else {
          this.http.getEmp(code.value).subscribe(emp => {
            this.emp = emp;
            sessionStorage.setItem('user-emp', JSON.stringify(emp));
          });
        }
      });
    }
  }

  signout(): void {
    sessionStorage.clear();
    this.emp = Object.assign({}, EMPTY_EMP);
  }

  // 새 사용자 등록 화면 열기
  signup() {
    this.pwError = false;
    this.editing = true;
    this.okUpdate = true;
    this.http.getDeptNames().subscribe(data => this.depts = data);
  }

  // 사용자 정보 수정 화면 열기
  update(): void {
    this.editing = true;
    this.okUpdate = false;  // 비밀번호 확인 전
  }

  // 사용자 정보 수정에 앞서 입력한 비밀번호 확인
  confirm(pw): void {
    if (this.focus(pw, null)) {
      this.http.isPwOk(this.emp.code, pw.value).subscribe(ok => {
        if (this.okUpdate = ok) {
          pw.value = "";
        } else {
          this.pwError = true;
          pw.focus();
        }
      });
    }
  }

  // 입력 갑을 검사하고 저장한다 (입력 노드들)
  save(code, pw1, pw2, name, deptId, phone, email) {
    if (!this.codeError && !this.pwError) {
      if (this.focus(code, "code") &&
          this.focus(pw1, "pw")    && this.focus(pw2, "pw") &&
          this.focus(name, "name") && this.focus(phone, "phone") &&
                                      this.focus(email, "email")) {
        if (this.emp.id) {
          this.http.updateEmp(this.emp).subscribe(() => {
            this.editing = false;  // 사용자 정보 수정 완료
          });
        } else if (this.focus(deptId, "deptId")) {
          this.http.insertEmp(this.emp).subscribe(id => {
            // this.emp.id = id;      // 다시 로그인하지 않고 들어간다
            this.emp.id = 0;       // 다시 로그인하고 들어간다
            this.editing = false;  // 새 사용자 등록 완료
          });
        }
      }
    }
  }

  // 사용자 아이디 중복 검사 (아이디 입력 node)
  checkCode(code) {
    if (code.value != this.emp.code) {
      this.http.countCode(code.value).subscribe(count => {
        if (this.codeError = 0 < count) {
          code.focus();
        }
      });
    }
  }

  // 입력한 두 비밀번호가 다르면 나중에 입력한 곳에 커서를 넣는다
  checkPw(pw1, pw2) {
    if (this.pwError = pw1.value && pw2.value && pw1.value != pw2.value) {
      pw1.focus();
    }
  }

  // 입력한 값이 없으면 그곳에 커서를 넣는다
  focus(node, field: string): boolean {
    if (node.value) {
      if (field) {
        this.emp[field] = node.value;  // 입력한 값을 사용자 객체에 넣는다
      }
      return true;
    } else if (this.emp.id && field) {
      return true;   // 사용자 정보 수정일 때는 입력하지 않아도 된다
    } else {
      node.focus();  // 입력하지 않은 곳에 커서를 넣는다
      return false;  // 새 사용자는 빈칸이 있으면 에러
    }
  }
}