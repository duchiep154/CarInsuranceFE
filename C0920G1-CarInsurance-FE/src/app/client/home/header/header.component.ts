import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../security/service/auth.service";
import {TokenStorageService} from "../../../security/service/token-storage.service";
import {MatDialog} from "@angular/material/dialog";
import {ContractService} from "../../contract/contract.service";
import {LoginComponent} from "../../../security/login/login.component";
import {timeout} from "rxjs/operators";
import {RegisterComponent} from "../../../security/register/register.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  roles: string[];
  isLoggedIn = false;
  username: string;

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private tokenStorageService: TokenStorageService,
              public dialog: MatDialog,
              public contractService: ContractService) {
  }

  // Kiem tra xem co tai khoan dang dang nhap hay khong de hien thi ---Chien TM---
  ngOnInit(): void {
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
    }, timeout(5));
  }

  // Mo Dialog dang ky ---Chien TM---
  openDialogRegister() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '600px',
      height: '670px',
      disableClose: true,
      panelClass: 'custom-modalbox'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }
}
