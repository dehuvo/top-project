import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Doc, Approval } from './doc.model';

const URL = "http://" + window.location.hostname + ":8080/docs/";
const URL_A = "http://" + window.location.hostname + ":8080/appr/";

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class DocHttpService {

  constructor(private http: HttpClient) {}

  // 결재상신 리스트 조회하기
  // param : id(세션id), 0(결재여부,상신완료상태)
  getList(id: number, skip: number, count: number): Observable<any[]> {
    return this.http.post<number[]>(URL+'range', [id, skip, count], HTTP_OPTIONS).pipe(
      catchError(this.handleError<any>('myDocList'))
    );
  }

  getApprovals(deptId: number) {
    return this.http.get<Approval[]>(URL + "appr/" + deptId);
  }

  // 결재승인 리스트 조회하기
  docIngList(id:number, stat:number): Observable<Doc[]> {
    return this.http.post<Doc[]>(URL, [id,stat], HTTP_OPTIONS).pipe(
      catchError(this.handleError<any>('docIngList'))
    );
  }

  getDetail(id): Observable<Doc> {
    return this.http.get<Doc>(URL + id);
  }

  get(id): Observable<any[]> {
    return this.http.get<any[]>(URL + id);
  }

  insert(doc: Doc): Observable<any> {
    return this.http.post<Doc>(URL, doc, HTTP_OPTIONS);
  }

  inserts(a: Approval[]): Observable<any> {
    return this.http.post<Approval[]>(URL, a, HTTP_OPTIONS);
  }

  update(doc: Doc): Observable<any> {
    return this.http.put<Doc>(URL, doc, HTTP_OPTIONS);
  }

  updateAppr(a: Approval): Observable<any> {
    return this.http.put<Approval>(URL_A, a, HTTP_OPTIONS);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(URL + id).pipe(
      catchError(this.handleError<any>('delete'))
    );
  }

  deleteAppr(id: number): Observable<any> {
    return this.http.delete(URL_A + id).pipe(
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