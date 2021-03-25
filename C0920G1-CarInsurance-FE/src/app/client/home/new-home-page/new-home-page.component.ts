import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../security/service/auth.service";
import {TokenStorageService} from "../../../security/service/token-storage.service";
import {MatDialog} from "@angular/material/dialog";
import {ContractService} from "../../contract/contract.service";
import {LoginComponent} from "../../../security/login/login.component";
import {RegisterComponent} from "../../../security/register/register.component";
import {CreateContractComponent} from "../../contract/create-contract/create-contract.component";
import {MatSnackBar} from "@angular/material/snack-bar";
@Component({
  selector: 'app-new-home-page',
  templateUrl: './new-home-page.component.html',
  styleUrls: ['./new-home-page.component.scss']
})
export class NewHomePageComponent implements OnInit {
  roles: string[];
  isLoggedIn = false;
  username: string;
  position = true;
  id: any;
  checkRLogin = false;
  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private tokenStorageService: TokenStorageService,
              public dialog: MatDialog,
              public contractService: ContractService,
              private _snackBar: MatSnackBar) {
  }
  // Kiem tra xem co tai khoan dang dang nhap hay khong de hien thi ---Chien TM---
  ngOnInit(): void {
    if (this.tokenStorage.getUser() == null){
      this.isLoggedIn = false;
    } else {
      console.log(this.tokenStorage.getUser().roles);
      if (this.tokenStorage.getUser().roles[0] !== 'ROLE_CUSTOMER' || this.tokenStorage.getUser().roles == null){
        this.position = false;
      } else {
        this.position = true;
      }
    }
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }
  }
  // Dang xuat ---Chien TM---
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  //khanh mở dialog create
  openDiablogCreate(): void{
    // this.checkRLogin = this.tokenStorage.getUser();
    console.log(this.tokenStorage.getUser());
    if (this.tokenStorage.getUser() == null){
      this.openSnackBar('Bạn cần đăng nhập để thực hiện hành động.', 'Ok', 'invalid-snackbar')
      this.openDialogLogin();
    } else {
      const dialogRef = this.dialog.open(CreateContractComponent, {
        width: '800px',
        maxHeight: '90vh',
        disableClose: true
      })
    }
  }
  // Mo Dialog dang nhap ---Chien TM---
  openDialogLogin() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      disableClose: true,
      panelClass: 'custom-modalbox'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }
  // Mo Dialog dang ky ---Chien TM---
  openDialogRegister() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '600px',
      height: '650px',
      disableClose: true,
      panelClass: 'custom-modalbox'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }
  openSnackBar(message: string, action: string, className: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: "center",
      panelClass: [className]
    });
  }
}
