import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICommentLike } from '../interfaces/commentLike';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/api-environment';

@Injectable({
  providedIn: 'root'
})
export class CommentLikeService {

  private api: string;

  constructor(private http: HttpClient) 
  { 
    this.api = environment.apiUrl + 'CommentLikes';
  }

  getAll(): Observable<ICommentLike[]> {
    return this.http.get<ICommentLike[]>(this.api);
  }

  getById(id: number): Observable<ICommentLike> {
    return this.http.get<ICommentLike>(`${this.api}/${id}`);
  }

  getByCommentId(id: number): Observable<ICommentLike[]> {
    return this.http.get<ICommentLike[]>(`${this.api}/getByCommentId/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  create(comment: ICommentLike): Observable<any> {
    return this.http.post(this.api, comment);
  }

  edit(comment: ICommentLike): Observable<any> {
    return this.http.put(this.api, comment);
  }
}
