import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Doc, Approval } from './doc.model';

const URL = "http://" + window.location.hostname + ":8080/doc/";

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: "root"})
export class DocHttpService {
  constructor(private http: HttpClient) {}

  // 문서 리스트 조회 (사용자 id)
  getList(userId: number, limit: number): Observable<Doc[]> {
    return this.http.get<Doc[]>(URL + userId + "/" + limit);
  }

  // 문서 본문과 결재선 조회 (문서 id)
  get(docId): Observable<any[]> {
    return this.http.get<any[]>(URL + docId);
  }

  // 결재선 배열 찾기 (문서 작성 부서 id)
  getApprovals(deptId: number) {
    return this.http.get<Approval[]>(URL + "a/" + deptId);
  }

  // 승인/반려 (승인/반려 결재자, 전후 결재자 또는 null)
  approve(list: Approval[]): Observable<any> {
    return this.http.patch<Approval[]>(URL, list, HTTP_OPTIONS);
  }

  // 새 문서 저장/상신
  insert(doc: Doc): Observable<any> {
    return this.http.post<Doc>(URL, doc, HTTP_OPTIONS);
  }

  // 문서 수정 저장/상신
  update(doc: Doc): Observable<any> {
    return this.http.put<Doc>(URL, doc, HTTP_OPTIONS);
  }

  delete(docId: number): Observable<any> {
    return this.http.delete(URL + docId).pipe(
      catchError(this.handleError<any>("delete"))
    );
  }

  private handleError<T> (operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}