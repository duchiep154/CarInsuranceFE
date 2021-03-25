import { Injectable } from '@angular/core';
import {TokenStorageService} from "./service/token-storage.service";
import {ActivatedRouteSnapshot, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class EmployeeAuthService {

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router,
              private matSnackBar: MatSnackBar) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.tokenStorageService.getToken();

    if (token == null) {
      this.router.navigateByUrl('/');
      this.matSnackBar.open('Bạn cần đăng nhập để thực hiện tác vụ!', '403', {
        duration: 4000,
      });
      return false;
    } else if (!this.isRole()) {
      this.router.navigateByUrl('/');
      this.matSnackBar.open('Bạn không phải là ADMIN!', '403', {
        duration: 4000,
      });
      return false;
    } else {
      return true;
    }
  }

  isRole() {
    const tokenPayload = this.tokenStorageService.getAuthorities();
    console.log(tokenPayload);
    for (let role of tokenPayload) {
      console.log(role);
      if (role == "ROLE_ADMIN") {
        return true;
      }
    }
    return false
  }
}
