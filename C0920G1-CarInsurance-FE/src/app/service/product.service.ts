import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {TokenStorageService} from "../security/service/token-storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  httpOptions: any;
  public API = 'http://localhost:8080/api/employee/product';
  public APICONTRACT = 'http://localhost:8080/contract';

  API_URL: string;

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private _snackBar: MatSnackBar,
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorage.getToken() })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200'
      , 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  //Thêm mới -THINH
  addNewProduct(product):Observable<any>{
    return this.http.post(this.API+'/create',product);
  }

  // Lấy data để tạo select option-THINH
  getAllProduct():Observable<any>{
    return this.http.get(this.API ,this.httpOptions);
  }

  getAllCarType():Observable<any>{
    return this.http.get(this.API+'/car-type',this.httpOptions);
  }
  getAllProductType():Observable<any>{
    return this.http.get(this.API+'/product-type',this.httpOptions);
  }

  // Hàm search-THINH
  getProductSearchTrue(searchTrue: string, size: number,pageTrue:number,nameSorting:boolean): Observable<any>{
    return this.http.get(this.API +'/list-status-true'+'?searchTrue=' + searchTrue + '&size=' + size+ '&pageTrue=' + pageTrue+'&nameSorting=' + nameSorting);
  }
  getProductSearchFalse(searchFalse: string, size: number,pageFalse:number,nameSorting:boolean): Observable<any>{
    return this.http.get(this.API +'/list-status-false'+'?searchFalse=' + searchFalse + '&size=' + size+ '&pageFalse=' + pageFalse+'&nameSorting=' + nameSorting);
  }

  //____ + ____ + ____ + ____ + ____ + ____ + ____

  // Hieu 2021-03-16
  // Tính năng: tìm product bằng id
  findProductById(id): Observable<any> {
    return this.http.get(this.API + '/search-product-by-id/' + id);
  }

  // Hieu 2021-03-16
  // Tính năng: update product bằng front end
  updateProductByQuery(idProduct, product): Observable<any> {
    return this.http.put(this.API + '/update/' + idProduct, product);
  }

  // Hieu 2021-03-17
  // Tính năng: delete product không có trong danh sách hợp đồng
  deleteProductByQuery(idProduct): Observable<any> {
    return this.http.delete(this.API + '/product-not-in-contract/' + idProduct);
  }

  // Hieu 2021-03-19
  // Tính năng: cập nhật thay đổi status product
  changeStatusProduct(idProduct): Observable<any> {
    return this.http.get(this.API + '/change-status/' + idProduct);
  }

  // Hieu 2021-03-19
  // Tính năng: cập nhật thay đổi status product
  getListProductIdNotInContract(): Observable<any> {
    return this.http.get(this.API + '/list-product-not-in-contract');
  }

  // Hieu_Thinh 2021-03-22
  // Tính năng: hiện snackbar massage thông báo lên
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

  // Hieu 2021-03-24
  // Tính năng: Lấy List<ProductUpdateDTO> của product từ Back end
  getProductDTOIdAndName(): Observable<any> {
    return this.http.get(this.API + '/product-id-name');
  }

  // ---------------------------------------------------------------------

  // Hưng contract dữ liệu
  getAllProducts(): Observable<any> {
    return this.http.get(this.APICONTRACT + '/product', this.httpOptions)
  }

  // ---------------------------------------------------------------------


// ____ + ____ + ____ + ____ + ____ + ____ +

}


