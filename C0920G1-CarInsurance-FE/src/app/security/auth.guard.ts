import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {TokenStorageService} from "./service/token-storage.service";

@Injectable({
  providedIn: 'root'
})
//Tran Minh Chien
//Phan quyen phia FE
export class AuthGuard implements CanActivate{
  constructor(private tokenStorageService: TokenStorageService,
              private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.tokenStorageService.getToken();
    const currentUser =  this.tokenStorageService.getUser();
    if (token !== null) {
      this.router.navigateByUrl('/login');
      return false;
    }else {
      return true;
    }
  }
}
