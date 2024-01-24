import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/post';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/api-environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private api: string;
  public imagUrl : string;
  constructor(private http: HttpClient) 
  {
    this.api = environment.apiUrl + 'Posts';  
    this.imagUrl = environment.imageUrl;
  }

  getAll(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.api);
  }

  getById(id: number): Observable<IPost> {
    return this.http.get<IPost>(`${this.api}/${id}`);
  }

  getByUserId(id: string): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${this.api}/getByUserId/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  create(post: FormData): Observable<any> {
    return this.http.post(this.api, post).pipe(
      catchError((error) => {
        console.error('Error creating post:', error);
        // Handle error appropriately, you may want to throw or return a default value
        return throwError(error);
      })
    );
  }

  edit(post: IPost): Observable<any> {
    return this.http.put(this.api, post);
  }
}
