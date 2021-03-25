import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
//Tran Minh Chien
//Man Hinh Dang Ky Tai Khoan
export class RegisterComponent implements OnInit {

  @ViewChild('inputUsername') inputUsername: ElementRef;
  @ViewChild('inputCheckPassword') inputCheckPassword: ElementRef;
  @ViewChild('inputEmail') inputEmail: ElementRef;
  @ViewChild('inputIdcard') inputIdcard: ElementRef;
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  isUsernameFailed = false;
  isPasswordFailed = false;
  isEmailFailed = false;
  isIdcardFailed = false;

  isAddressFailed = true;
  isIdcardNullFailed = true;
  isEmailNullFailed = true;
  isPhoneFailed = true;
  isNameCustomerFailed = true;
  isPasswordNullFailed = true;
  isUsernameNullFailed = true;
  isCheckPasswordNullFailed = true;
  errorMessageNoUsername = '';
  errorMessagePassword = '';
  listError: any = '';
  createformGroup: FormGroup;

  constructor(private authService: AuthService,
              public dialogRef: MatDialogRef<RegisterComponent>,
              private formBuild: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _snackBar: MatSnackBar) {
  }

  //    Lay ve du lieu nhap tu form va Validate
  ngOnInit(): void {
    this.createformGroup = this.formBuild.group({
      username: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
      checkPassword: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9_\\.]{6,32}$")]],
      name: ['', [Validators.required, Validators.pattern(/^([A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ]([a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]+)[ ])+[A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ]([a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)$/)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9_]+[a-z0-9]@([a-z0-9]+\\.)[a-z]+(|\\.[a-z]+)')]],
      phone: ['', [Validators.required, Validators.pattern('(0)[35789][0-9]{8}')]],
      idCard: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
      address: ['', [Validators.required]],
    });
  }

  // Khi click dang ky se chay ham nay.
  onSubmitRes(): void {
    console.log(this.createformGroup.value);
    this.authService.register(this.createformGroup.value).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.closeDialog();
        this.openSnackBar('Đăng ký tài khoản thành công','OK','invalid-snackbar');
      },
      err => {
        if (err.status == 400) {
          console.log(err.error);
          this.listError = err.error;
        }

        if (err.error.nameError === 'noUsername') {
          this.errorMessageNoUsername = err.error.message;
          this.inputUsername.nativeElement.focus();
          this.isUsernameFailed = true;
        }

        this.isSignUpFailed = true;
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

  errName(value) {
    if (value !== null || value !== '') {
      this.isUsernameFailed = false;
      this.isUsernameNullFailed = false;
    }
  }

  errEmail(value) {
    if (value !== null || value !== '') {
      this.isEmailFailed = false;
      this.isEmailNullFailed = false;
    }
  }

  errIdcard(value) {
    if (value !== null || value !== '') {
      this.isIdcardFailed = false;
      this.isIdcardNullFailed = false;
    }
  }

  errNameCustomer(value) {
    if (value !== null || value !== '') {
      this.isNameCustomerFailed = false;
    }
  }

  errPhone(value) {
    if (value !== null || value !== '') {
      this.isPhoneFailed = false;
    }
  }

  errAddress(value) {
    if (value !== null || value !== '') {
      this.isAddressFailed = false;
    }
  }

  errPassword(value: any) {
    if (value !== null || value !== '') {
      this.isPasswordNullFailed = false;
    }
  }

  errCheckPassword(value: any) {
    if (value !== null || value !== '') {
      this.isCheckPasswordNullFailed = false;
    }
  }

  openSnackBar(message: string, action: string,classname: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: "center",
      panelClass: [classname]
    });
  }
}
