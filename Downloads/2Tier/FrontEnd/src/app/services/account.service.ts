import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/api-environment';
import { ILoginRequest, ILoginResponse, IRegisterRequest } from '../interfaces/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private tokenKey: string = 'access_token';
  private currentUserId!: string;
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + 'Users';
  }

  login(data: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(
      `${this.url}/login`, 
      { 
        username: data.username,
        password: data.password 
      }
    );
  }
  register(data: IRegisterRequest): Observable<any> {
    return this.http.post<IRegisterRequest>(
      `${this.url}/register`, 
      { 
        username: data.username,
        displayUsername: data.displayUsername,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        city:data.city
      }
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.url}/logout`, null);
  }
  isAuthorized(): boolean {
    return this.getToken() != null;
  }
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
  clearCurrentUserId(): void {
    localStorage.removeItem(this.currentUserId);
  }
  saveToken(token: string): void{
    localStorage[this.tokenKey] = token;
  }
  getToken(): string {
    return localStorage[this.tokenKey];
  }
  setCurrentUserId(userId: string) {
    localStorage[this.currentUserId] = userId;
  }
  getCurrentUserId(): string {
    return localStorage[this.currentUserId];
  }
}