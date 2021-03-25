import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../security/service/token-storage.service";
import {Contract} from "../models/contract/contract";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private API = 'http://localhost:8080/contract';
  httpOptions: any;

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
  addNewContract(contract): Observable<any> {
    return this.http.post(this.API + '/create', contract, this.httpOptions);
  }

  //hưng update vs Byid vs delete
  getById(id: number): Observable<any> {
    return this.http.get(this.API + '/' + id, this.httpOptions);
  }

  updateContract(contract: Contract) {
    return this.http.put(this.API + '/updateContract/' + contract.id, contract, this.httpOptions)
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.API + '/contract/' + id , this.httpOptions);
  }
//
}
