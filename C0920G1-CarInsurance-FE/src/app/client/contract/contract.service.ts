//<Khanh>
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../../security/service/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  public product = 'http://localhost:8080/product/';
  public API = 'http://localhost:8080/contract/';
  public httpOptions: any;
  private statusMessage: boolean;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorage.getToken() })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  getAllContract(page, idUser, size, idContract, startDate, endDate, statusPay): Observable<any> {
    if (idContract == '' && startDate == '' && endDate == '' && statusPay == '') {
      return this.http.get(this.API + 'list' + '?page=' + page + '&size=' + size + '&idUser='
        + idUser + '&statusPay=' + statusPay + '&startDate=' + startDate + '&endDate=' + endDate + '&idContract='
        + idContract, this.httpOptions)
    } else if (idContract !== '' && startDate == '' && endDate == '' && statusPay == '') {
      return this.http.get(this.API + 'listByIdContract' + '?page=' + page + '&size=' + size + '&idUser='
        + idUser + '&idContract=' + idContract, this.httpOptions)
    } else if (idContract == '' && startDate !== '' && endDate !== '' && statusPay == '') {
      return this.http.get(this.API + 'listByRangeDate' + '?page=' + page + '&size=' + size + '&idUser='
        + idUser + '&startDate=' + startDate + '&endDate=' + endDate, this.httpOptions)
    } else if (idContract == '' && startDate == '' && endDate == '' && statusPay !== '') {
      return this.http.get(this.API + 'listByStatusPay' + '?page=' + page + '&size=' + size + '&idUser='
        + idUser + '&statusPay=' + statusPay, this.httpOptions)
    } else if (idContract !== '' && startDate !== '' && endDate !== '' && statusPay == '') {
      return this.http.get(this.API + 'listByIdContractAndRangeDate' + '?page=' + page + '&size=' + size + '&idUser='
        + idUser + '&idContract=' + idContract + '&startDate=' + startDate + '&endDate=' + endDate, this.httpOptions)
    } else if (idContract !== '' && startDate == '' && endDate == '' && statusPay !== '') {
      return this.http.get(this.API + 'listByIdContractAndStatusPay' + '?page=' + page + '&size=' + size + '&idUser='
        + idUser + '&idContract=' + idContract + '&statusPay=' + statusPay, this.httpOptions)
    } else if (idContract == '' && startDate !== '' && endDate !== '' && statusPay !== '') {
      return this.http.get(this.API + 'listByRangeDateAndStatusPay' + '?page=' + page + '&size=' + size + '&idUser='
        + idUser + '&startDate=' + startDate + '&endDate=' + endDate + '&statusPay=' + statusPay, this.httpOptions)
    } else if (idContract !== '' && startDate !== '' && endDate !== '' && statusPay !== '') {
      return this.http.get(this.API + 'listByIdContractAndRangeDateAndStatusPay' + '?page=' + page + '&size=' + size + '&idUser='
        + idUser + '&idContract=' + idContract + '&startDate=' + startDate + '&endDate=' + endDate + '&statusPay='
        + statusPay, this.httpOptions)
    }
  }
  getCustomer(idUser): Observable<any>{
    return this.http.get(this.API + 'customer' + '?idUser=' + idUser, this.httpOptions)
  }
  getAllProduct(): Observable<any> {
    return this.http.get(this.API + 'listProduct', this.httpOptions);
  }
  getContractById(idContract): Observable<any> {
    return this.http.get(this.API + 'getContract' + '?idContract=' + idContract, this.httpOptions);
  }
  checkProduct(nameProduct):Observable<any>{
    return this.http.get(this.API + 'checkProduct' + '?nameProduct=' + nameProduct, this.httpOptions)
  }
  checkNumberPlate(nameNumberPlate):Observable<any>{
    return this.http.get(this.API + 'checkNumberPlate' + '?nameNumberPlate=' + nameNumberPlate, this.httpOptions)
  }


  // Tuấn làm phía admin
  getAllContracts(page: number, size: number, onSorting: boolean, textSorting: string): Observable<any>{
    return this.http.get(this.API + 'admin/list' + '?page=' + page + '&size=' + size + '&onSorting=' + onSorting + '&textSorting=' + textSorting, this.httpOptions);
  }
  getAllContractByEndOrStartDate(inputSearch: string, size: number): Observable<any>{
    return this.http.get(this.API + 'admin' + '?inputSearch=' + inputSearch + '&size=' + size , this.httpOptions);
  }
  approval(idContract,duration): Observable<any>{
    return this.http.get(this.API + 'approval' + '?idContract=' + idContract + '&duration=' + duration, this.httpOptions)
  }

  // Khánh làm



  getAllEmployee(): Observable<any> {
    return this.http.get(this.product + 'employee', this.httpOptions);
  }
  getAllCar(idCus): Observable<any> {
    return this.http.get(this.API + 'carOfCus' + '?idCus=' + idCus, this.httpOptions);
  }

  getCar(idCar): Observable<any>{
    return this.http.get(this.API + 'car' + '?idCar=' + idCar, this.httpOptions)
  }
  getProduct(product): Observable<any>{
    return this.http.get(this.API + 'product' + '?product=' + product, this.httpOptions)
  }
  createContract(contract): Observable<any>{
    console.log(contract)
    let id = this.tokenStorage.getUser().id;
    let idCar = contract.car.id
    if(idCar != undefined){
      return this.http.post(this.API + 'save' + '?idCar=' + idCar, {
        time: contract.stepOne.time,
        startDate: contract.stepOne.startDate,
        endDate: contract.stepOne.endDate,
        statusPay: contract.stepOne.statusPay,
        statusApproval: contract.stepOne.statusApproval,
        product: contract.stepOne.product,
        numberPlate: contract.numberPlate,
        carIdNumber: contract.carIdNumber,
        manufacturer: contract.manufacturer,
        yearManufacturing: contract.yearManufacturing
      }, this.httpOptions)
    }else {
      return this.http.post(this.API + 'saveCar' + '?id=' + id, {
        time: contract.stepOne.time,
        startDate: contract.stepOne.startDate,
        endDate: contract.stepOne.endDate,
        statusPay: contract.stepOne.statusPay,
        statusApproval: contract.stepOne.statusApproval,
        product: contract.stepOne.product,
        numberPlate: contract.numberPlate,
        carIdNumber: contract.carIdNumber,
        manufacturer: contract.manufacturer,
        yearManufacturing: contract.yearManufacturing
      }, this.httpOptions)
    }
  }
  setStatusMessage(){
    this.statusMessage = !this.statusMessage;
  }
  getStatusMessage(){
    return this.statusMessage;
  }
  setApproval(idContract, idCustomer, page, size): Observable<any>{
    console.log(idContract);
    return this.http.get(this.API + 'updateApproval' + '?idContract=' + idContract + '&idCustomer='
      + idCustomer + '&page=' + page + '&size=' + size, this.httpOptions)
  }

  //hung
  delete(id: number): Observable<any> {
    return this.http.delete(this.API + '' + id , this.httpOptions);
  }
}
//</Khanh>
