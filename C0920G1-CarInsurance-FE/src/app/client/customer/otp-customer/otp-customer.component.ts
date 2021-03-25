import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormControl, FormGroup} from '@angular/forms';
import { CustomerClientServiceService } from 'src/app/service/customer-client-service.service';
import { TokenStorageService } from 'src/app/security/service/token-storage.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material/dialog";
import { Inject } from '@angular/core';
import { MessageComponent } from 'src/app/employee/admin/message/message.component';

@Component({
  selector: 'app-otp-customer',
  templateUrl: './otp-customer.component.html',
  styleUrls: ['./otp-customer.component.scss']
})
export class OtpCustomerComponent implements OnInit {
  public userId;
  currenUser: any;
  changePass;
  notifitionOTP: string;
  displayMessage: string;
  OTP: string;



  OTPform = new FormGroup({
    changePass: new FormControl(''),
    otp: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<OtpCustomerComponent>,
    private customerService: CustomerClientServiceService,
    public activatedRoute: ActivatedRoute,
    private token: TokenStorageService,
    private dialog: MatDialog, 



    @Inject(MAT_DIALOG_DATA) public data: any) {}


  

  ngOnInit(): void {
    this.currenUser = this.token.getUser();
    this.userId = this.currenUser.id;
    this.changePass = this.data.data;
  
  }

  inputOTP(value){
    this.OTP = value;
  }
  

  onSubmit() {

   this.OTP = this.OTP + ',' + this.changePass;
    this.customerService.checkOTP(this.userId, this.OTP ).subscribe(data => {
      if(data == 2){
        this.notifitionOTP = 'Sai mã OTP'
      }

      if(data == 1){
        this.notifitionOTP = ''
        const dialogRef = this.dialog.open(MessageComponent, {
          width: '650px',
          data: 'Quý khách đã đổi mật khẩu thành công'
        });
      
        dialogRef.afterClosed();
      }
    },error => {
      console.log('EROR' +error)
      const dialogRef = this.dialog.open(MessageComponent, {
        width: '650px',
        data: 'Đổi mật khẩu không thành công'
      });  
      dialogRef.afterClosed();
    });
    ;
  }
}
  

