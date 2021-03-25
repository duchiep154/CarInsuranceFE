import { AngularFireStorage } from '@angular/fire/storage';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerServiceService } from 'src/app/service/customer-service.service';
import { FormGroup } from '@angular/forms';
import { dateOfBirth } from './customer-validator/date-of-birth.validator';
// Cre: nguyen bao
@Component({
  selector: 'app-edit-customer-employee',
  templateUrl: './edit-customer-employee.component.html',
  styleUrls: ['./edit-customer-employee.component.scss']
})
export class EditCustomerEmployeeComponent implements OnInit {
  formEditCustomer: FormGroup;
  customerId;
  imgSrc: string = '../../../../assets/img/nhan/employee.jpg';
  selectedImg: any;
  listError: any = "";
  isCheck;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerServiceService,
    private storage: AngularFireStorage,
    private dialogRef: MatDialogRef<EditCustomerEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.formEditCustomer = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[^\\d\\t`~!@#$%^&*()_\\-+=|\\\\{}\\[\\]:;"\'<>,.?\/]{7,40}$')]],
      gender: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required, dateOfBirth]],
      idCard: ['', [Validators.required, Validators.pattern('^\\d{9}$')]],
      phone: ['', [Validators.required, Validators.pattern('^0[0-9]{9}$')]],
      email: ['', [Validators.required, Validators.pattern('^(\\w+[a-z0-9]+\\.?)+[a-z0-9]+@([a-z]+\\.)+[a-z]+$')]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      img: []
    });

    this.customerId = this.data.data1.id;
    this.customerService.getCustomerById(this.customerId).subscribe(data => {
      this.imgSrc = data.img;
      this.formEditCustomer.patchValue(data);
    })
  }
  // Cap nhat khach hang
  update() {
    this.createFireBase();
  }

  // Up anh len firebase
  createFireBase() {
    if (this.formEditCustomer.valid) {
      if (this.formEditCustomer.controls.img.value != this.imgSrc) {
        const filePath = `undefined/${this.selectedImg.name}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, this.selectedImg).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(img => {
              this.formEditCustomer.controls.img.setValue(img);
              this.customerService.editCustomer(this.formEditCustomer.value, this.customerId).subscribe(() => {
                this.dialogRef.close();
                this.openSnackBar('Đã cập nhật thành công.', 'X', 'valid-snackbar');
              }, error => {
                this.listError = error.error;
              });
            })
          })
        ).subscribe();
      } else {
        this.formEditCustomer.controls.img.setValue(this.imgSrc);
        this.customerService.editCustomer(this.formEditCustomer.value, this.customerId).subscribe(() => {
          this.dialogRef.close();
          this.openSnackBar('Đã cập nhật thành công.', 'X', 'valid-snackbar');
        }, error => {
          this.listError = error.error;
        });
      }
    } else {
      this.openSnackBar('Dữ liệu chưa hợp lệ, mời bạn nhập lại.', 'X', 'invalid-snackbar');
    }
  }
  // Xem trước hình ảnh
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedImg = event.target.files[0];
      let formData = new FormData();
      formData.append("file", this.selectedImg);
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImg = event.target.files[0];
    } else {
      this.imgSrc = '../../../../assets/img/nhan/employee.jpg';
      this.selectedImg = null;
    }
  }

  openSnackBar(message: string, action: string, className: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: [className]
    });
  }

  checkInput(item) {
    this.isCheck = false;
    if (this.listError !== "") {
      switch (item) {
        case "idCard":
          this.listError.idCard = "";
          this.listError.existIdCard = "";
          this.isCheck = true;
          break;
        case "phone":
          this.listError.phone = "";
          this.listError.existPhone = "";
          this.isCheck = true;
          break;
        case "email":
          this.listError.email = "";
          this.listError.existEmail = "";
          this.isCheck = true;
          break;
      }
    }
  }
}
