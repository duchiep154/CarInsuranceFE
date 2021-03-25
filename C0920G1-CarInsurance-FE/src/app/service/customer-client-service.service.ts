import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerClientServiceService {

  // service cua trang
 
  private customerURL = "http://localhost:8080/api/customer-client/";
  private updatePassURL = "http://localhost:8080/api/customer-client/updatePass/";
  private userOTPURL = "http://localhost:8080/api/customer-client/OTP/";
  private emailURL = "http://localhost:8080/api/customer-client/email/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  constructor(private http: HttpClient) { }

  findCustomerByIdUser(id) {
    return this.http.get(this.customerURL + id);
  }

 
  updateCustomer(id, data){
    return this.http.put(this.customerURL + id, JSON.stringify(data), this.httpOptions);
  }

  updatePassword(id, data) {
    return this.http.put(this.updatePassURL + id, data);
  }

  sendOTP(id){
    return this.http.get(this.userOTPURL + id);
  }

  checkOTP(id, data){
    return this.http.post(this.userOTPURL + id, data);
  }

   getPass(id: number, password: string): Observable<any>{
     return this.http.post<any>(this.customerURL + 'getPass/' + id, password, this.httpOptions)
   }

}
