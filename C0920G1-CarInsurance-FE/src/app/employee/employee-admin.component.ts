import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../security/service/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee',
  templateUrl: './employee-admin.component.html',
  styleUrls: ['./employee-admin.component.scss']
})
export class EmployeeAdminComponent implements OnInit {
  employeeOfIdAccount;
  roles: string[];
  isLoggedIn = false;
  username: string;
  constructor(
    private tokenStorageService: TokenStorageService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      // console.log(this.username);
      // console.log(user.username);
      this.username = user.username;
      this.employeeOfIdAccount = user.id;
    }
  }

  // Dang xuat ---Chien TM---
  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigateByUrl('');
  }
}
