import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import {CustomerClientServiceService} from "../../../service/customer-client-service.service";
import {Router} from "@angular/router";



import {TokenStorageService} from "../../../security/service/token-storage.service";

@Component({
  selector: 'app-otp-employee',
  templateUrl: './otp-employee.component.html',
  styleUrls: ['./otp-employee.component.scss']
})
export class OtpEmployeeComponent implements OnInit {

  public userId;
  currentUser: any;
  changePass;
  notificationOTP: string;


  OTPForm = new FormGroup({

    changePass: new FormControl(''),

    otp: new FormControl(''),



  });

  constructor(
    public dialogRef: MatDialogRef<OtpEmployeeComponent>,
    private customerService: CustomerClientServiceService,
    private router: Router,
    private token: TokenStorageService,

    @Inject(MAT_DIALOG_DATA) public data: any) {}




  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userId = this.currentUser.id;
    this.changePass = this.data.data;
  }


  onSubmit(value) {
    value = value + ',' + this.changePass;
    this.customerService.checkOTP(this.userId, value ).subscribe(data => {
      if(data == 2){
        this.notificationOTP = 'Sai mã OTP'
      }
    });
  }

}
