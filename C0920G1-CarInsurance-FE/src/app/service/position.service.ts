import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {any} from "codelyzer/util/function";
import {TokenStorageService} from "../security/service/token-storage.service";

import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //   }),
  // };
  httpOptions: any;

  private API = 'http://localhost:8080/api/admin/position';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorage.getToken() })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  getPosition():Observable<any> {
    return this.http.get(this.API , this.httpOptions);
  }

}
