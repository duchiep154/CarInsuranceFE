import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ContractDetail} from "../models/contract/contract-detail";
import {TokenStorageService} from "../security/service/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AccidentClientService {
  public API = 'http://localhost:8080/api/accident';
  public API1 = 'http://localhost:8080/api/contractDetail';
  public httpOptions: any;


  constructor(public httpClient: HttpClient,  private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorage.getToken() })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  getListAccident(): Observable<any>{
    return this.httpClient.get(this.API);
  }

  addListAccident(accident): Observable<any>{
    return this.httpClient.post(this.API + '/create', JSON.stringify(accident), this.httpOptions);
  }

  getContractDetailById(contractDetailId): Observable<ContractDetail>{
    return this.httpClient.get<ContractDetail>(this.API1 + '/' + contractDetailId);
  }
  getListContractDetail(): Observable<any> {
    return this.httpClient.get(this.API1);
  }
}

