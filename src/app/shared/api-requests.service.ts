import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Article} from "./article";

@Injectable({
  providedIn: 'root'
})
export class ApiRequestsService {
  baseUrl = 'http://localhost:3000/article';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Article[]>{
    return this.http.get<Article[]>(this.baseUrl);
  }

  getFiltered(language?: string[], topic?: string[]): Observable<Article[]> {
    let params = new HttpParams();
    if (language!=null && language.length>0) {
      for (const value of language) {
        params = params.append('l', value.toLowerCase());
      }
    }
    if (topic!=null && topic.length>0) {
      for (const value of topic) {
        params = params.append('t', value.toLowerCase());
      }
    }
    return this.http.get<Article[]>(this.baseUrl, {params});
  }
  //TODO post, update, delete

  updateEntryByID(id: string, updatedArticle: Article): Observable<Article> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Article>(url, updatedArticle);
  }

  deleteEntryByID(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
