import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../../../service/employee.service";
import {PositionService} from "../../../service/position.service";
import {UsersService} from "../../../service/users.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {TokenStorageService} from "../../../security/service/token-storage.service";
import {MessageComponent} from "../../admin/message/message.component";
import {MatDialog} from "@angular/material/dialog";
import {dateOfBirth} from "../../customer/edit-customer-employee/customer-validator/date-of-birth.validator";

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.scss']
})
export class DetailEmployeeComponent implements OnInit {
  birthday = null;
  formUpdateEmployee: FormGroup;
  employeeOfIdAccount;
  position: any;
  gender: String;
  selectImg: any = null;
  imgSrc: string = 'https://vnn-imgs-f.vgcloud.vn/2020/03/23/11/trend-avatar-13.jpeg';
  listError: any = '';
  isMessage = false;
  nameCheck: any;


  constructor(private router: Router,
              private employeeService: EmployeeService,
              private positionService: PositionService,
              private usersService: UsersService,
              private activatedRoute: ActivatedRoute,
              private storage: AngularFireStorage,
              private token: TokenStorageService,
              private dialog: MatDialog,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formUpdateEmployee = this.fb.group({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.pattern(/^([A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ]([a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]+)[ ])+[A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ]([a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)$/)]),
      gender: new FormControl('', [Validators.required]),
      dateOfBirth: ['', [Validators.required, dateOfBirth]],
      idCard: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^(0)[35789][0-9]{8}$/)]),
      email: new FormControl(''),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required, Validators.pattern(/^([A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ]([a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]+)[ ])+[A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ]([a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)$/)]),
      img: new FormControl('img'),
      position: new FormControl(''),
      users: new FormControl('users')
    });
    this.employeeOfIdAccount =  this.token.getUser().id;
    this.activatedRoute.params.subscribe(data => {
      this.employeeService.getEmployeeByIdAccount(this.employeeOfIdAccount).subscribe(data1 => {
        this.imgSrc = data1.img;
        this.position = data1.position.name;
        this.gender = data1.gender;
        this.formUpdateEmployee.patchValue(data1);
      });
    });
  }

  update() {
    this.createFileBase();
  }

  createFileBase() {
    if (this.formUpdateEmployee.controls.img.value != this.imgSrc) {
      const filePath = `undefined/${this.selectImg.name}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectImg).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((img) => {
            this.formUpdateEmployee.controls.img.setValue(img);
            this.employeeService.updateEmployeeRoleEmployee(this.formUpdateEmployee.value).subscribe(next => {
              const dialogRef = this.dialog.open(MessageComponent, {
                data: 'Chỉnh sữa thông tin thành công.'
              });
              dialogRef.afterClosed();
            });
          }), error => {
            if (error.status === 400) {
              console.log(error.error);
              this.listError = error.error;
            } else if (error.status === 500) {
              this.isMessage = true;
            }
          };
        })
      ).subscribe();
    } else {
      this.formUpdateEmployee.controls.img.setValue(this.imgSrc);
      this.employeeService.updateEmployeeRoleEmployee(this.formUpdateEmployee.value).subscribe(next => {
        const dialogRef = this.dialog.open(MessageComponent, {
          data: 'Chỉnh sữa thông tin thành công.'
        });
        dialogRef.afterClosed();
      }), error => {
        if (error.status === 400) {
          console.log(error.error);
          this.listError = error.error;
        } else if (error.status === 500) {
          this.isMessage = true;
        }
      };
    }
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectImg = event.target.files[0];
      let formData = new FormData();
      formData.append("file", this.selectImg);
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectImg = event.target.files[0];
    } else {
      this.imgSrc = '/assets/img/img1.jpg';
      this.selectImg = null;
    }
  }

   checkX() {
    function clearEmpty(word) {
      return word !== "";
    }
    this.nameCheck = this.formUpdateEmployee.patchValue(name);
    let arrX = this.nameCheck.split(' ').filter(clearEmpty);
    let completeX = "";
    for (let i = 0; i < arrX.length; i++) {
      let char = arrX[i].charAt(0).toUpperCase() + arrX[i].slice(1).toLowerCase();
      completeX += char + ' ';
    }
     this.nameCheck = completeX.trim();
  }
}
