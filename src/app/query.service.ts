import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  URL: string = 'http://localhost:8080/sparql';
  constructor(private http: HttpClient) { }

  executeQuery(query: string){
    let body = new HttpParams();
    body = body.set('q', query.trim());
    return this.http.get(this.URL, {params: body});
  }

}
