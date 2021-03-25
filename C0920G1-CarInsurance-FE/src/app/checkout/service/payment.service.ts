import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable} from "rxjs";
import {BillDTO} from "../model/billDTO";
import {BillListDTO} from "../model/billListDTO";

import {Contract} from "../../models/contract/contract";
import {TokenStorageService} from "../../security/service/token-storage.service";
import {ContractDetail} from "../../models/contract/contract-detail";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  url = 'http://localhost:8080/api/checkout';






  httpOptions:any


  constructor(public http:HttpClient,
              public  tokenStorageService:TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorageService.getToken()
      })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  getContractId(id: String):Observable<BillDTO> {
    return this.http.get<BillDTO>(this.url + '/contract/{id}' + id)

  }

  getBillDTO(id: string):Observable<BillDTO> {
    return this.http.get<BillDTO>(this.url + '/bill/' + id)

  }
  getBillListDTO(billListDTO : BillListDTO):Observable <BillDTO> {
    return this.http.get<BillDTO>(this.url + '/list/' + billListDTO);

  }


   creatBillPaymentPayPal (payDTO)  {

    return this.http.post(this.url + '/pay-paypal',payDTO,this.httpOptions );
  }
  creatBillPaymentOffline (payDTO) {
    console.log(payDTO);
    return this.http.put(this.url + '/payment',payDTO ,this.httpOptions)
  }





}
