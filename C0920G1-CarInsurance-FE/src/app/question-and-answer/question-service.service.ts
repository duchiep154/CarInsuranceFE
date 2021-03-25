import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../security/service/token-storage.service';

@Injectable({
  providedIn: 'root'
})
//Phúc
export class QuestionServiceService {

  httpOptions: any;
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorage.getToken() })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  url = 'http://localhost:8080/api/questions';

  //Phúc
  //Hàm lấy api list question
  getAllQuestion(page: number, size: number):Observable<any> {
    return this.http.get(this.url + '?page=' + page + '&size=' + size , this.httpOptions)
  }

  //Phúc
  //Hàm lấy api và tạo question
  createQuestion(question: Object): Observable<Object>{
    return this.http.post(this.url, question , this.httpOptions);
  }

  //Phúc
  //Hàm lấy api và xóa question
  deleteQuestion(id): Observable<any> {
    return this.http.delete(this.url + '/' + id, this.httpOptions);
  }

  //Phúc
  //Hàm lấy api theo id question
  getQuestionById(id): Observable<any>{
    return this.http.get(this.url + '/' + id, this.httpOptions)
  }

  //Phúc
  //Hàm lấy api và chỉnh sửa question
  updateQuestionById(id, value): Observable<Object>{
    return this.http.put(this.url + '/' + id, value, this.httpOptions)
  }
}
