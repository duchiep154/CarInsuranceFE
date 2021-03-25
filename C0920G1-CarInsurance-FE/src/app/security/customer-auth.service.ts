import { Injectable } from '@angular/core';
import {TokenStorageService} from "./service/token-storage.service";
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class CustomerAuthService implements CanActivate{

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router,
              private matSnackBar: MatSnackBar) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.tokenStorageService.getToken();

    if (token == null) {
      this.router.navigateByUrl('/');
      this.matSnackBar.open('Bạn cần đăng nhập để thực hiện tác vụ!', 'Ok', {
        duration: 4000,
      });
      return false;
    } else if (!this.isRole()) {
      this.router.navigateByUrl('/');
      this.matSnackBar.open('Bạn không có quyền truy cập trang này!', 'Ok', {
        duration: 4000,
      });
      return false;
    } else {
      return true;
    }
  }
  isRole() {
    const tokenPayload = this.tokenStorageService.getAuthorities();
    for (let role of tokenPayload) {
      if (role == "ROLE_CUSTOMER") {
        return true;
      }
    }
    return false
  }
}
