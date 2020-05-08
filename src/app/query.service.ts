import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  URL: string = 'http://localhost:8080/sparql/mock/';
  constructor(private http: HttpClient) { }

  executeQuery(query: string){
    let body = new HttpParams();
    body = body.set('q', query.trim());
    return this.http.post(this.URL, body);
  }

}
