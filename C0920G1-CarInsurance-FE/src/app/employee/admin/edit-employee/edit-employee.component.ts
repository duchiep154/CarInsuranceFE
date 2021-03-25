import {Component, OnInit} from '@angular/core';
import {Position} from "../../../model/position";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Users} from "../../../model/users";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../../../service/employee.service";
import {PositionService} from "../../../service/position.service";
import {UsersService} from "../../../service/users.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {MessageComponent} from "../message/message.component";
import {MatDialog} from "@angular/material/dialog";
import {dateOfBirth} from "../../customer/edit-customer-employee/customer-validator/date-of-birth.validator";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import {ComfirmComponent} from "../comfirm/comfirm.component";
//Hàm của hưng
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
  //import của hưng
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class EditEmployeeComponent implements OnInit {

  positionList: any[];
  formUpdateEmployee: FormGroup;
  employeeOfId;
  usersList: Users[];
  selectImg: any = null;
  imgSrc: string = 'https://vnn-imgs-f.vgcloud.vn/2020/03/23/11/trend-avatar-13.jpeg';
  message: String;
  maxDate = new Date(2003, 11, 31);
  minDate = new Date(1900, 0, 1);
  loading: boolean;

  constructor(private router: Router,
              private employeeService: EmployeeService,
              private positionService: PositionService,
              private usersService: UsersService,
              private activatedRoute: ActivatedRoute,
              private storage: AngularFireStorage,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllPosition();
    this.getAllUsers();
    this.formUpdateEmployee = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.pattern(/^[^\d`~!@#$%^&*()_\-+=|\\{}\[\]:;"'<>,.?/]{5,20}$/), Validators.maxLength(20)]),
      gender: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required, dateOfBirth]),
      idCard: new FormControl('', [Validators.required, Validators.pattern('[0-9]{9}')]),
      phone: new FormControl('', [Validators.required, Validators.pattern('(0)[35789][0-9]{8}')]),
      email: new FormControl('', [Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/), Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      img: new FormControl('img'),
      position: new FormControl('', [Validators.required]),
      users: new FormControl('users')
    });
    this.activatedRoute.params.subscribe(data => {
      this.employeeOfId = Number(data.id);
      this.employeeService.getById(this.employeeOfId).subscribe(data1 => {
        this.imgSrc = data1.img;
        this.formUpdateEmployee.patchValue(data1)
      })
    });
  }


  getAllPosition() {
    this.positionService.getPosition().subscribe((data: Position[]) => {
      this.positionList = data;
    }, error => console.log(error));
  }

  getAllUsers() {
    this.usersService.getUsers().subscribe((data: Users[]) => {
      this.usersList = data;
    }, error => console.log(error));
  }

  update() {
    this.createFileBase();
  }

  createFileBase() {
    if (this.formUpdateEmployee.controls.img.value != this.imgSrc) {
      this.loading = true;
      const filePath = `undefined/${this.selectImg.name}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectImg).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((img) => {
            this.formUpdateEmployee.controls.img.setValue(img);
            this.employeeService.updateEmployee(this.formUpdateEmployee.value).subscribe(next => {
              setTimeout(() => {
                const dialogRef = this.dialog.open(MessageComponent, {
                  data: 'Chỉnh sửa nhân viên thành công.'
                });
                dialogRef.afterClosed();
              }, 400);
            }, error => {
              console.log(error);
            }, () => {
              this.loading = false;
              this.router.navigate(['admin/employee/list']);
            });
          })
        })
      ).subscribe();
    } else {
      this.formUpdateEmployee.controls.img.setValue(this.imgSrc);
      this.employeeService.updateEmployee(this.formUpdateEmployee.value).subscribe(next => {
        this.router.navigate(['admin/employee/list']);
        setTimeout(() => {
          const dialogRef = this.dialog.open(MessageComponent, {
            data: 'Chỉnh sửa nhân viên thành công.'
          });
          dialogRef.afterClosed();
        }, 400);
      }, error => {
        if (error.status == 409) {
          const dialogRef = this.dialog.open(MessageComponent, {
            data: 'Nhân viên này không tồn tại.'
          });
          dialogRef.afterClosed();
        }
      });
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

  openDialogEdit() {
    const dialogRef = this.dialog.open(ComfirmComponent, {
      data: 'Bạn có muốn thoát chỉnh sửa hay không.'
    });
    dialogRef.afterClosed();
  }
}



