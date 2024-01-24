import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFollow } from '../interfaces/follow';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/api-environment';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private api: string;

  constructor(private http: HttpClient) 
  { 
    this.api = environment.apiUrl + 'Follows';
  }

  getAll(): Observable<IFollow[]> {
    return this.http.get<IFollow[]>(this.api);
  }

  getById(id: number): Observable<IFollow> {
    return this.http.get<IFollow>(`${this.api}/${id}`);
  }

  getByFollowerId(id: string): Observable<IFollow[]> {
    return this.http.get<IFollow[]>(`${this.api}/getByFollowerId/${id}`);
  }

  getByFollowedUserId(id: string): Observable<IFollow[]> {
    return this.http.get<IFollow[]>(`${this.api}/getByFollowedUserId/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  create(follow: IFollow): Observable<any> {
    return this.http.post(this.api, follow);
  }

  edit(follow: IFollow): Observable<any> {
    return this.http.put(this.api, follow);
  }
}
