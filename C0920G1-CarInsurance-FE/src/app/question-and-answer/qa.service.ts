import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Answer} from "../models/qvsa/answer";
import {TokenStorageService} from "../security/service/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class QaService {

  private readonly API = 'http://localhost:8080/qa';
  private httpOptions: { headers: HttpHeaders; "Access-Control-Allow-Origin": string; "Access-Control-Allow-Methods": string };

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorage.getToken() })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  listQA(): Observable<any>{
    return this.http.get(this.API + '/list',this.httpOptions);
  }

  getQuestionId(questionId): Observable<any>{
    return this.http.get(this.API + '/get/' + questionId,this.httpOptions);
  }

  getAnswerId(answerId): Observable<any>{
    return this.http.get(this.API + '/getA/'+ answerId,this.httpOptions);
  }

  creatAnswer(id: number, answer: Answer): Observable<any>{
    return this.http.post(this.API + '/add/'+ id, answer,this.httpOptions);
  }

  editAnswer(id: number, answer: Answer): Observable<any>{
    return this.http.put(this.API + '/edit/'+ id, answer,this.httpOptions);
  }

  getStatus(answerId): Observable<any>{
    return this.http.put(this.API + '/status/' + answerId,this.httpOptions);
  }
}
