import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Users} from "../model/users";
import { TokenStorageService } from '../security/service/token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private URL_API = 'http://localhost:8080/api/employee';
  httpOptions: any;
  private API = 'http://localhost:8080/api/admin/users';
  private APINhan = 'http://localhost:8080/api/user/detail';


  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorage.getToken()
      })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

    getUsers():Observable <any> {
      return this.http.get(this.API, this.httpOptions);
  }

    getNewUser(user:string, password:string):Observable < any > {
      return this.http.get(this.API + '?user=' + user + '&password=' + password, this.httpOptions);
  }

  checkUser(user: string): Observable<boolean> {
    return this.http.get<boolean>(this.API + '/check-user' + '?user='+ user);
  }
  // nhan
  getUserById(id: number): Observable<any>{
    return this.http.get(this.APINhan + '/' + id);
  }

  updatePassword(user: Users) {
    return null;
  }
    checkUser1(user:string):Observable < any > {
      return this.http.get<boolean>(this.URL_API + '/check-user' + '?user=' + user, this.httpOptions);
  }


    // getUsers() {
    //   return this.http.get(this.API);
    // }
    //
    // getAllUsers(): Observable<any>{
    //   return this.http.get(this.API);
    // }
    //
    // getNewUser(user: string, password: string): Observable<any> {
    //   return this.http.get(this.API + '?user='+ user + '&password=' + password);
    // }
    //
    // checkUser(user: string): Observable<boolean> {
    //   return this.http.get<boolean>(this.API + '/check-user' + '?user='+ user);
    // }
    // }

}
