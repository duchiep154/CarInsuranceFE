import {AuthService} from "../service/auth.service";
import {TokenStorageService} from "../service/token-storage.service";
import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RegisterComponent} from "../register/register.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

//Tran Minh Chien
//Man hinh dang nhap
export class LoginComponent implements OnInit {
  @ViewChild('inputUsername') inputUsername: ElementRef;

  formGroup: FormGroup;
  username: string;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage: any;
  roles: string[] = [];
  returnUrl: string;
  error: any;

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private formBuild: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              public dialogRef: MatDialogRef<LoginComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar) {
  }

  //Check tinh trang dang nhap -Chien TM
  ngOnInit(): void {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'employee/detail';
    if (this.tokenStorage.getToken()) {
      const user = this.tokenStorage.getUser();
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.username = this.tokenStorage.getUser().username;
    }
    this.formGroup = this.formBuild.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      // remember_me: ['']
    });
  }

  // Khi click Dang nhap se chay ham nay.
  onSubmit(): void {
    this.authService.login(this.formGroup.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.username = this.tokenStorage.getUser().username;
        this.roles = this.tokenStorage.getUser().roles;
        if (this.roles[0] == 'ROLE_EMPLOYEE' || this.roles[0] == 'ROLE_ADMIN') {
          console.log(this.tokenStorage.getUser().id);
          this.router.navigateByUrl(this.returnUrl + '/' + this.tokenStorage.getUser().id);
        }
        this.formGroup.reset();
        this.closeDialog();
         this.ngOnInit();
      },
      err => {
        if (err.status === 400) {
          this.error = err.error;
        }
        this.errorMessage = err.error.message;
        // this.inputUsername.nativeElement.focus();
        this.isLoginFailed = true;
      }
    );
  }


  closeDialog() {
    this.dialogRef.close();
  }

  //Mo Dialog Dang ky
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

@Component({
  selector: 'customer-snackbar',
  template: `<div style="color: white">a</div>`
})
export class CustomerSnackbarComponent {

}
