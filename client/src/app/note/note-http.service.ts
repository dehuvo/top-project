import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Note } from './note.model';

const URL = "http://" + window.location.hostname + ":8080/notes/";

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class NoteHttpService {
  constructor(private http: HttpClient) { }

  getList(skip: number, count: number): Observable<any[]> {
    return this.http.post<any[]>(URL + "list", [skip, count], HTTP_OPTIONS);
  }

  get(id: number): Observable<Note> {
    return this.http.get<Note>(URL + id);
  }

  update(note: Note): Observable<any> {
    return this.http.put<Note>(URL, note, HTTP_OPTIONS);
  }

  insert(note: Note): Observable<any> {
    return this.http.post<Note>(URL, note, HTTP_OPTIONS);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(URL + id).pipe(
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