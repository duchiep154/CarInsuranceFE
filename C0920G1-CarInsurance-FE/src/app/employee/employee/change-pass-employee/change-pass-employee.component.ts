import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../../../security/service/token-storage.service";
import {MatDialog} from "@angular/material/dialog";
import {EmployeeService} from "../../../service/employee.service";
import {OtpEmployeeComponent} from "../otp-employee/otp-employee.component";
import {MessageComponent} from "../../admin/message/message.component";

@Component({
  selector: 'app-change-pass-employee',
  templateUrl: './change-pass-employee.component.html',
  styleUrls: ['./change-pass-employee.component.scss']
})
export class ChangePassEmployeeComponent implements OnInit {
  public userId;
  currentUser: any;
  data;
  private oldPass;
  notification: string;
  notificationPassNew: string;
  checkPass: FormGroup;
  checkDisplayOTP = false;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private token: TokenStorageService,
    public dialog: MatDialog,
    public formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userId = this.currentUser.id;
    this.checkPass = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
      confirmNewPassword: ['', [Validators.required]]
    }, {validators: this.comparePassword})
  }

  comparePassword(c: AbstractControl) {
    const value = c.value;
    return (value.newPassword === value.confirmNewPassword) ? null : {
      passwordNotMatch: true
    };
  }


  getOldPass(value) {
    this.oldPass = value;
    if (value == null || value == '' || value == undefined) {
      this.notification = 'Vui lòng nhập mật khẩu';
      this.checkDisplayOTP = false;
    } else {
      this.employeeService.getPass(this.userId, this.oldPass).subscribe(data => {
        if (data == 1) {
          this.notification = '';
          this.checkDisplayOTP = true;
          const dialogRef = this.dialog.open(MessageComponent, {
            data: 'Chỉnh sữa mật khẩu thành công.'
          });
          dialogRef.afterClosed();
        } else {
          this.checkDisplayOTP = false;
          this.notification = 'Sai mật khẩu';
        }
      });
    }
  }

  checkOldWithNewPass(value) {
    if (this.oldPass === value) {
      this.checkDisplayOTP = false;
      this.notificationPassNew = 'Trùng với mật khẩu cũ';
    } else {
      this.notificationPassNew = '';
      this.checkDisplayOTP = true
    }
  }

  updatePassword() {
    if (this.checkDisplayOTP) {
      this.employeeService.sendOTP(this.userId).subscribe(data => {
      });
      const dialogRef = this.dialog.open(OtpEmployeeComponent, {
        width: '650px',
        data: {data: this.checkPass.value.newPassword}
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    }
  }
}
