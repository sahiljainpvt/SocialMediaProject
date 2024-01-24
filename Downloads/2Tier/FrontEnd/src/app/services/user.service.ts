import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user';
import { environment } from 'src/environments/api-environment';
import { User } from '../components/model/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private api: string = 'https://localhost:7085/api/Users';
  constructor(private http: HttpClient) {}


  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.api);
  }

  getById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.api}/${id}`);
  }

  getByUserName(name: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.api}/getByUserName/${name}`);
  }
  getByCity(city: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.api}/getByCity/${city}`);
  }

  getFollowersByUserId(id: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.api}/getFollowersByUserId/${id}`);
  }

  getFollowingByUserId(id: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.api}/GetFollowingByUserId/${id}`);
  }

  getLikedUsersByPostId(id: number): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.api}/getLikedUsersByPostId/${id}`);
  }

  getLikedUsersByCommentId(id: number): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.api}/getLikedUsersByCommentId/${id}`);
  }

  edit(user: IUser): Observable<any> {
    return this.http.put(this.api, user);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  create(user: IUser): Observable<any> {
    return this.http.post(this.api, user);
  }
}
