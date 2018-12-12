import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Emp, Dept } from './emp-dept.model';

const BASE_URL = "http://" + window.location.hostname + ":8080/";
const EMP_URL = BASE_URL + "emp/"
const DEPT_URL = BASE_URL + "dept/"

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class EmpDeptHttpService {
  constructor(private http: HttpClient) {}

  // 사용자 아이디로 사용자 정보를 불러온다 (사용자 아이디)
  getEmp(code: string): Observable<Emp> {
    return this.http.post<Emp>(EMP_URL + 'c', code, HTTP_OPTIONS);
  }

  // 같은 사용자 아이디가 사용되는지 검사 (사용자 아이디) -->
  countCode(code: string): Observable<number>{
    return this.http.post<number>(EMP_URL + 'cc', code, HTTP_OPTIONS);
  }

  // 아이디와 비밀번호 검사 (아이디, 비밀번호) --> true/false
  isPwOk(code:string, pw:string): Observable<boolean> {
    return this.http.post<boolean>(EMP_URL + 'pw', [code, pw], HTTP_OPTIONS);
  }

  // 새 사용자 정보 등록
  insertEmp(emp: Emp): Observable<number> {
    return this.http.post<number>(EMP_URL, emp, HTTP_OPTIONS).pipe(
      catchError(this.handleError<any>('add'))
    );
  }

  // 수정한 사용자 정보를 저장한다
  updateEmp(emp: Emp): Observable<Emp> {
    return this.http.put<Emp>(EMP_URL, emp, HTTP_OPTIONS).pipe(
      catchError(this.handleError<any>('update'))
    );
  }

  deleteEmp(id:number): Observable<any> {
    return this.delete(EMP_URL + id);
  }

  getDept(): Observable<Dept> {
    return this.http.get<Dept>(DEPT_URL);
  }

  getDeptNames(): Observable<object[][]> {
    return this.http.get<object[][]>(DEPT_URL + "name");
  }

  getMembers(id: number): Observable<Emp[]> {
    return this.http.get<Emp[]>(DEPT_URL + 'm/' + id);
  }

  insertDept(dept: Dept): Observable<any> {
    return this.http.post<Dept>(DEPT_URL, dept, HTTP_OPTIONS);
  }

  updateDept(dept: Dept): Observable<any> {
    return this.http.put<Dept>(DEPT_URL, dept, HTTP_OPTIONS);
  }

  deleteDept(id: number): Observable<any> {
    return this.http.delete(DEPT_URL + id);
  }

  delete(url:string): Observable<any> {
    return this.http.delete(url).pipe(
      catchError(this.handleError<any>('delete'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}