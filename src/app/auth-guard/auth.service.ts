import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtRequest } from '../shared/credentials.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseURL;
  constructor(private http: HttpClient) {
  }

  getAuthenticated(username, password): Observable<JwtRequest> {
    const url = `${this.baseUrl}authenticate`;
    return this.http.post<JwtRequest>(url, { username: username, password: password }, { headers: { skip: 'true' } }).pipe(
      tap(token => this.storetoken(token)));

  }

  storetoken(token) {
    localStorage.setItem('token', token['token']);
  }
  isUserLogedIn() {
    return !!this.getToken();
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }
  logOut() {
    localStorage.removeItem('token');
  }
}
