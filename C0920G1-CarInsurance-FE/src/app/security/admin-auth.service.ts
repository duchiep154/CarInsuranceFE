import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {TokenStorageService} from "./service/token-storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
// Trần Minh Chiến, phân quyền FE
export class AdminAuthService implements CanActivate {

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
      this.matSnackBar.open('Bạn không có quyền truy cập trang này!', '403', {
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
      if (role == "ROLE_ADMIN" || role == "ROLE_EMPLOYEE") {
        return true;
      }
    }
    return false
  }

}
