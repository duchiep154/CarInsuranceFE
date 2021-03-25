import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerServiceService} from "../../../service/customer-service.service";
import {Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {MessageComponent} from "../../admin/message/message.component";
import {MatDialog} from "@angular/material/dialog";
import {dateOfBirth} from "../edit-customer-employee/customer-validator/date-of-birth.validator";

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {
  formAddNewCustomer: FormGroup;
  selectedImage: any = null;
  imgSrc = '../assets/img/nhan/employee.jpg';
  users: any[];
  isMessage = false;
  isMessage1 = false;
  isMessage2 = false;
  isMessage3 = false;
  listError: any = "";
  loading = false;


  constructor(
    public formBuilder: FormBuilder,
    public customerService: CustomerServiceService,
    public router: Router,
    private storage: AngularFireStorage,
    private dialog: MatDialog
  ) {
  }

  //  Thế Anh Xét dữ liệu customer
  ngOnInit(): void {
    this.formAddNewCustomer = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.pattern('^[^\\d`~!@#$%^&*()_\\-+=|\\\\{}\\[\\]:;"\'<>,.?\/]+$')]),
      dateOfBirth: new FormControl('', [Validators.required, this.checkDateOfBirth]),
      gender: new FormControl('', [Validators.required]),
      idCard: new FormControl('', [Validators.required, Validators.pattern('^\\d{9}$')]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^0[35789]\\d{8}$')]),
      email: new FormControl('', [Validators.required, Validators.pattern('^(\\w+[a-z0-9]+\\.?)+[a-z0-9]+@([a-z]+\\.?)+[a-z]+\\.com$')]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      img: new FormControl('', [Validators.required]),
      users: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
      newPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  // Thế Anh thêm mới customer
  addNewCustomer(formValue) {
    this.isMessage = false;
    this.loading = true;
    this.isMessage1 = false;
    this.isMessage2 = false;
    this.isMessage3 = false;
    if (this.formAddNewCustomer.valid) {
      if (this.formAddNewCustomer.value.newPassword === this.formAddNewCustomer.value.confirmPassword) {
        const filePath = `customer/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              formValue.img = url;
              console.log(url);
              console.log(formValue);
              this.customerService.addNewCustomer(formValue).subscribe(data => {
                this.router.navigateByUrl('employee/customers-list');
                setTimeout(() => {
                  const dialogRef = this.dialog.open(MessageComponent, {
                    data: 'Thêm mới khách hàng thành công.'
                  });
                  dialogRef.afterClosed();
                }, 400);
              }, error => {
                if (error.status === 400) {
                  console.log(error.error);
                  this.listError = error.error;
                } else if (error.status === 404) {
                  this.isMessage = true;
                }
              }, () => {
                this.loading = false;
              });
            });
          })).subscribe()
      } else {
        this.isMessage = true;
      }
    } else {
      this.customerService.addNewCustomer(formValue).subscribe(data => {
        this.router.navigateByUrl('employee/customers-list');
        setTimeout(() => {
          const dialogRef = this.dialog.open(MessageComponent, {
            data: 'Thêm mới khách hàng thành công.'
          });
          dialogRef.afterClosed();
        }, 400);
      }, error => {
        if (error.status === 400) {
          console.log(error.error);
          this.listError = error.error;
        } else if (error.status === 404) {
          this.isMessage = true;
        }
      }, () => {
        this.loading = false;
      });
    }
  }

  // Thế anh up ảnh firebase
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '../assets/img/nhan/employee.jpg';
      this.selectedImage = null;
    }
  }


  // Thế anh xác thực mật khẩu

  comparePassword(c: AbstractControl) {
    const value = c.value;
    console.log(value);

    return (value === this.formAddNewCustomer.value.newPassword) ? null : {
      passwordnotmatch: true
    };
  }

  checkDateOfBirth(absControl: AbstractControl): any {
    const value = absControl.value;
    const year = Number(value.substr(0, 4));

    return new Date().getFullYear() - year >= 18 ? null : {ageGreaterThan18: true};
  }


}
