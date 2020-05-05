import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  URL: string = 'localhost:8080/sparql';
  constructor(private http: HttpClient) { }

  executeQuery(query: string){
    return this.http.get(this.URL, {params: {q: query}});
  }

}
