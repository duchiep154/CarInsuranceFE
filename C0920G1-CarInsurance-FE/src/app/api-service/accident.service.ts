import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Accident} from "../models/contract/accident";
import {TokenStorageService} from "../security/service/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AccidentService {

  private readonly URL_API = 'http://localhost:8080/api/admin/accident';
  httpOptions: any;
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorage.getToken() })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  findAccidentWaitingApproval(page, search, size): Observable<any> {
    return this.http.get<Accident[]>(this.URL_API + '/listAccidentByStatus?page=' + page + '&size=' + size
      + '&search=' +search + '&idStatus=' + 1, this.httpOptions);
  }

  findAccidentNotApproval(page, search, size): Observable<any> {
    return this.http.get<Accident[]>(this.URL_API + '/listAccidentByStatus?page=' + page + '&size=' + size
      + '&search=' +search + '&idStatus=' + 3, this.httpOptions);
  }

  findAccidentWasApproval(page, search, size): Observable<any> {
    return this.http.get<Accident[]>(this.URL_API + '/listAccidentByStatus?page=' + page + '&size=' + size
      + '&search=' +search + '&idStatus=' + 2, this.httpOptions);
  }

  findAccidentById(id: number): Observable<any> {
    return this.http.get<any>(this.URL_API + '/' + id);
  }

  updateAccidentWasApproval(file: string): Observable<any> {
    return this.http.post<any>(this.URL_API + '/wasApproval/2', file);
  }

  updateAccidentNotApproval(file: string): Observable<any> {
    return this.http.post<any>(this.URL_API + '/notApproval/3', file)
  }
  //cường
  updateAccidentWasRefunded(mail: string,id:number): Observable<any> {
    console.log(this.httpOptions);
    return this.http.post<any>(this.URL_API + '/wasRefunded/' + id, mail, this.httpOptions)
  }

}
