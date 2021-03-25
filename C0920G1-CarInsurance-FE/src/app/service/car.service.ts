import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorageService} from "../security/service/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private url_car = 'http://localhost:8080/api/employee';
  private API = 'http://localhost:8080/contract';
  private httpOptions: any;


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

  getCars(page: number, size: number, onSorting: boolean, textSorting: string): Observable<any> {
    return this.http.get(this.url_car + '/cars-list/' + '?page=' + page + '&size=' + size + '&onSorting=' + onSorting + '&textSorting=' + textSorting);
  }

  getCar(): Observable<any> {
    return this.http.get(this.url_car + '/cars-list', this.httpOptions);
  }

  getAllCustomer(): Observable<any>{
    return this.http.get(this.url_car + '/car/customers-list' , this.httpOptions)
  }

  addNewCar(car): Observable<any> {
    return this.http.post(this.url_car + '/cars-create', car, this.httpOptions)
  }

  getAllCar(): Observable<any> {
    return this.http.get(this.API + '/cars', this.httpOptions)
  }

  ///////Cre: nguyen bao///////
  deleteCar(id): Observable<any> {
    return this.http.delete(this.url_car + '/car-delete/' + id, this.httpOptions);
  }

  getCarById(id): Observable<any>{
    return this.http.get(this.url_car + '/car/' + id, this.httpOptions);
  }
  /////////End of Cre: nguyen bao////////
}
