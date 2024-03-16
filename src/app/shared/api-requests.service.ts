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

  getAllEntries(): Observable<Article[]>{
    return this.http.get<Article[]>(this.baseUrl);
  }

  getFilteredEntries(language?: string[], topic?: string[]): Observable<Article[]> {
    let params = new HttpParams();
    if (language!=null && language.length>0) {
      for (const value of language) {
        params = params.append('l', value);
      }
    }
    if (topic!=null && topic.length>0) {
      for (const value of topic) {
        params = params.append('t', value);
      }
    }
    return this.http.get<Article[]>(this.baseUrl, {params});
  }

  addEntry(newArticle: Article): Observable<Article>{
    return this.http.post<Article>(this.baseUrl, newArticle);
  }

  getEntryByID(id: string): Observable<Article>{
    return this.http.get<Article>(this.baseUrl + '/' + id);
  }

  updateEntryByID(id: string, updatedArticle: Article): Observable<Article> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.patch<Article>(url, updatedArticle);
  }

  deleteEntryByID(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
