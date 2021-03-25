import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

//Tran Minh Chien
//Xac thuc thong tin khi dang ky dang nhap voi server.
const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  //Luc dang nhap se goi xuogn server
  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  // Khi dang ky se goi xuong server
  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      password: user.password,
      checkPassword: user.checkPassword,
      name: user.name,
      email: user.email,
      phone: user.phone,
      idCard: user.idCard,
      address: user.address,
    }, httpOptions);
  }
}
