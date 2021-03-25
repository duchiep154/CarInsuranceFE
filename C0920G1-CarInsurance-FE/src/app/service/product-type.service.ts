import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
  public API = 'http://localhost:8080/api/employee/product'
  public httpOptions: any;
  API_URL: string;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  // hieu 2021-03-17
  // tính năng: lấy danh sách ProductType từ back end
  getProductTypeList(): Observable<any>{
    return this.http.get(this.API + '/product-type')
  }
}
