import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { CustomerClientServiceService } from 'src/app/service/customer-client-service.service';
import { TokenStorageService } from 'src/app/security/service/token-storage.service';
import { OtpCustomerComponent } from '../otp-customer/otp-customer.component';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent implements OnInit {
  userId;
  currenUser: any;
  oldPass;
  notifition: string;
  notifitionPassNew: string;
  checkPass: FormGroup;
  checkDisplayOTP = false;


  constructor(
    private customerService: CustomerClientServiceService,
    private token: TokenStorageService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.currenUser = this.token.getUser();
    this.userId = this.currenUser.id;
    this.checkPass = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.comparePassword })
  }

  comparePassword(c: AbstractControl) {
    const value = c.value;
    return (value.newPassword === value.confirmPassword) ? null : {
      passwordnotmatch: true
    };
  }


  getOldPass(value) {
    this.oldPass = value;
    if (value == null || value == '' || value == undefined) {
      this.notifition = 'Vui lòng nhập mật khẩu mới';
      this.checkDisplayOTP = false;
    } else {
      this.customerService.getPass(this.userId, this.oldPass).subscribe(data => {
        if (data == 1) {
          this.notifition = '';
          this.checkDisplayOTP = true;
        } else {
          this.checkDisplayOTP = false;
          this.notifition = 'Sai mật khẩu. Vui lòng nhập đúng mật khẩu cũ';
        }
      });
    }
  }

  checkOldWithNewPass(value) {
    if (this.oldPass === value) {
      this.checkDisplayOTP = false;
      this.notifitionPassNew = 'Trùng với mật khẩu cũ';
    } else {
      this.notifitionPassNew = '';
      this.checkDisplayOTP = true
    }
  }

  updatePassword() {
    if (this.checkDisplayOTP) {
      this.customerService.sendOTP(this.userId).subscribe(data => {
      });
      const dialogRef = this.dialog.open(OtpCustomerComponent, {
        width: '650px',
        data: { data: this.checkPass.value.newPassword }
      });
      dialogRef.afterClosed();
    }
  }

  onpenDialogCancel() {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '650px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
}
