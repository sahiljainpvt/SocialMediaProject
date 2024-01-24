import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IComment } from '../interfaces/comment';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/api-environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private api: string;

  constructor(private http: HttpClient) 
  {
    this.api = environment.apiUrl + 'Comments';
  }

  getAll(): Observable<IComment[]> {
    return this.http.get<IComment[]>(this.api);
  }

  getById(id: number): Observable<IComment> {
    return this.http.get<IComment>(`${this.api}/${id}`);
  }

  getByPostId(id: number): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${this.api}/getByPostId/${id}`);
  }

  getByUserId(id: string): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${this.api}/getByUserId/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  create(comment: IComment): Observable<any> {
    return this.http.post(this.api, comment);
  }

  edit(comment: IComment): Observable<any> {
    return this.http.put(this.api, comment);
  }
}
