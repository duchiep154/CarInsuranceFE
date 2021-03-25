import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorageService} from "../security/service/token-storage.service";
import {Customer} from "../models/customer/customer";
@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {
  private url_customer = 'http://localhost:8080/api/employee';
  private httpOptions: any;
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorage.getToken() })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }
  //Lấy danh sách khách hàng của Tuấn ko được đụng vào
  getAllCustomers(): Observable<any>{
    return this.http.get(this.url_customer + '/customer-list-contract', this.httpOptions);
  }

  getAllCustomer(page: number, size: number, onSorting: boolean, textSorting: string): Observable<any>{
    return this.http.get(this.url_customer +'/customer-list' + '?page=' + page + '&size=' + size + '&textSorting=' + textSorting+ '&onSorting=' + onSorting , this.httpOptions);
  }

  getCustomerById(id): Observable<any>{
    return this.http.get<Customer>(this.url_customer + '/customer/' + id, this.httpOptions)
  }
  getAllCustomerByName(inputSearch: string, size: number): Observable<any>{
    return this.http.get(this.url_customer +'/customer-list' + '/' + '?inputSearch=' + inputSearch + '&size=' + size, this.httpOptions);
  }
  addNewCustomer(customer): Observable<any> {
    return this.http.post(this.url_customer + '/customer-create', customer, this.httpOptions);
  }

  searchCustomerByBirthdayy(birthdayStart: string , birthdayEnd: string, size ): Observable<any>{
    return this.http.get(this.url_customer + '/customer-list' + '?birthdayStart=' + birthdayStart
      + '&birthdayEnd=' + birthdayEnd  + '&size=' + size , this.httpOptions)
  }

  searchCustomerByContractStartDay(dayByContract: string ,size : number): Observable<any>{
    return this.http.get(this.url_customer + '/customer-list'+ '?dayByContract=' + dayByContract + '&size=' + size, this.httpOptions)
  }



  //////////Cre: nguyen bao/////////
  editCustomer(Customer, id): Observable<any> {
    return this.http.put(this.url_customer + '/customer-edit/' + id, Customer, this.httpOptions);
  }
  deleteCustomer(id): Observable<any> {
    console.log(this.url_customer);
    return this.http.delete(this.url_customer + '/customer-delete/' + id, this.httpOptions);
  }
  /////////End of Cre: nguyen bao////////
}
