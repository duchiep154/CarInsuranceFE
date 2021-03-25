import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../../service/employee.service";
import {Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {PositionService} from "../../../service/position.service";
import {MessageComponent} from "../message/message.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {dateOfBirth} from "../../customer/edit-customer-employee/customer-validator/date-of-birth.validator";

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  public formCreateEmployee: FormGroup;
  public maxDate = new Date();
  public minDate = new Date(1900, 1, 1);
  imgSrc = '../assets/img/nhan/employee.jpg';
  selectedImage: any = null;
  public positions: any[];
  isMessage = false;
  listError: any = "";
  loading = false;
  isCheck = true;

  constructor(
    public fb: FormBuilder,
    public employeeService: EmployeeService,
    public router: Router,
    private storage: AngularFireStorage,
    public positionService: PositionService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.isCheck = true;
    this.getAllPositions();
    this.formCreateEmployee = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.pattern('^[^\\d\\t`~!@#$%^&*()_\\-+=|\\\\{}\\[\\]:;\"\'<>,.?\\/]{1,30}$')]),
      dateOfBirth: new FormControl('', [Validators.required, dateOfBirth]),
      gender: new FormControl('', [Validators.required]),
      idCard: new FormControl('', [Validators.required, Validators.pattern('[0-9]{9}')]),
      phone: new FormControl('', [Validators.required, Validators.pattern('(0)[35789][0-9]{8}')]),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9_]+[a-z0-9]@([a-z0-9]+\\.)[a-z]+(|\\.[a-z]+)')]),
      address: new FormControl('', [Validators.required, Validators.pattern('^[^\\d\\t`~!@#$%^&*()_\\-+=|\\\\{}\\[\\]:;\"\'<>,.?\\/]{1,15}$')]),
      city: new FormControl('', [Validators.required, Validators.pattern('^[^\\d\\t`~!@#$%^&*()_\\-+=|\\\\{}\\[\\]:;\"\'<>,.?\\/]{1,15}$')]),
      img: new FormControl('', [Validators.required]),
      users: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/)]),
      newPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/)]),
      confirmPassword: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required])
    });
  }

  //Thêm mới nhân viên
  addNewEmployee(formValue) {
    this.isCheck = false;
    this.isMessage = false;
    this.loading = true;
    if (this.formCreateEmployee.valid) {
      const filePath = `employee/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue.img = url;
            this.employeeService.addNewEmployee(formValue).subscribe(data => {
              this.router.navigateByUrl('/admin/employee/list');
              setTimeout(() => {
                const dialogRef = this.dialog.open(MessageComponent, {
                  data: 'Thêm mới nhân viên thành công.'
                });
                dialogRef.afterClosed();
              }, 400);
            }, error => {
              this.alertInvalid();
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
      this.employeeService.addNewEmployee(formValue).subscribe(data => {
      }, error => {
        this.alertInvalid();
        if (error.status === 400) {
          console.log(error.error);
          this.listError = error.error;
        }
      }, () => {
        this.loading = false;
      });
    }
  }

  //Xem trước ảnh trước khi up file
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

  //Lấy danh sách chức vụ
  private getAllPositions() {
    this.positionService.getPosition().subscribe(data => {
      this.positions = data;
    });
  }

  //Check ngày sinh > 18 tuổi front-end
  checkDateOfBirth(absControl: AbstractControl): any {
    const value = absControl.value;
    const year = Number(value.substr(0, 4));

    return new Date().getFullYear() - year >= 18 ? null : {ageGreaterThan18: true};
  }

  //Snackbar báo lỗi nhập dữ liệu
  alertInvalid() {
    this.openSnackBar('Dữ liệu nhập không đúng, vui lòng nhập lại', 'X', 'invalid-snackbar')
  }

  // Hien thi snackbar
  openSnackBar(message: string, action: string, className: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: [className]
    });
  }

  checkInput(item) {
    if (this.listError !== "") {
      this.isCheck = false;
      switch (item) {
        case "account":
          this.listError.users = "";
          this.listError.existAccount = "";
          this.isCheck = true;
          break;
        case "newPassword":
          this.listError.newPassword = "";
          this.isCheck = true;
          break;
        case "notCorrect" :
          this.listError.notCorrect = "";
          this.isCheck = true;
          break;
        case "name":
          this.listError.name = "";
          this.isCheck = true;
          break;
        case "dayOfBirth":
          this.listError.dateOfBirth = "";
          this.isCheck = true;
          break;
        case "gender":
          this.listError.gender = "";
          this.isCheck = true;
          break;
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
        case "address":
          this.listError.address = "";
          this.isCheck = true;
          break;
        case "city":
          this.listError.city = "";
          this.isCheck = true;
          break;
        case "position":
          this.listError.position = "";
          this.isCheck = true;
          break;
        case "img":
          this.listError.img = "";
          this.isCheck = true;
          break;
      }
    }
  }
}
