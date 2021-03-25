import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../model/employee";
import {TokenStorageService} from "../security/service/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  httpOptions: any;
  //hưng
  private API = 'http://localhost:8080/api/admin/employee';
  private APICONTRACT = 'http://localhost:8080/contract';

  //
  private API_1 = 'http://localhost:8080/api/admin/users';
  private API_2 = 'http://localhost:8080/api/employee/detail';
  private updatePassURL = "http://localhost:8080/api/employee/changepass/";
  private userOTPURL = "http://localhost:8080/api/employee/OTP/";
  private userURL = "http://localhost:8080/api/employee/";

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
  getAllEmployeeContract(): Observable<any> {
    return this.http.get(this.API);
  }

  getAllEmployees(page: number, size: number, onSorting: boolean, textSorting: string): Observable<any> {
    return this.http.get(this.API + '/list/' + '?page=' + page + '&size=' + size + '&onSorting=' + onSorting + '&textSorting=' + textSorting);
  }

  getAllEmployeeByNameOrPhone(inputSearch: string, size: number): Observable<any> {
    return this.http.get(this.API + '?inputSearch=' + inputSearch + '&size=' + size);
  }

  addNewEmployee(employee): Observable<any> {
    console.log(employee);
    return this.http.post(this.API, employee, this.httpOptions);
  }

  //hưng byID****
  getById(id: number): Observable<any> {
    return this.http.get(this.API + '/' + id, this.httpOptions);
  }
  //******

  //hưng update****
  updateEmployee(employee):Observable<any> {
    return this.http.put(this.API + '/' + employee.id, employee)
  }
  //******


  //hưng delete*****
  delete(id: number): Observable<any> {
    return this.http.delete(this.API + '/' + id);
  }
  //hưng delete****

  getEmployeeByIdAccount(id: number): Observable<any> {
    return this.http.get(this.API_2 + '/' + id, this.httpOptions);
  }

  updateEmployeeRoleEmployee(employee: Employee) {
    return this.http.put(this.API_2 + '/' + employee.id, employee)
  }

  //hưng lấy thông tin nhân viên để chỉnh sửa hợp đồng****
  getAllEmployee(): Observable<any> {
    return this.http.get(this.APICONTRACT + '/employee', this.httpOptions)
  }
  //*************************************************

  //của anh nhân
  updatePassword(id, data) {
    return this.http.put(this.updatePassURL + id, data);
  }
  //của anh nhân
  sendOTP(id) {
    return this.http.get(this.userOTPURL + id);
  }
  //của anh nhân
  checkOTP(id, data) {
    return this.http.post(this.userOTPURL + id, data);
  }
  //của anh nhân
  getPass(id: number, password: string): Observable<any> {
    return this.http.post<any>(this.userURL + 'getPass/' + id, password, this.httpOptions)
  }
}
