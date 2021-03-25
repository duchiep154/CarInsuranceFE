import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { CustomerClient } from 'src/app/customer-client';
import { TokenStorageService } from 'src/app/security/service/token-storage.service';
import { dateOfBirth } from 'src/app/employee/customer/edit-customer-employee/customer-validator/date-of-birth.validator';
import { CustomerClientServiceService } from 'src/app/service/customer-client-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { MessageComponent } from 'src/app/employee/admin/message/message.component';
import { OtpCustomerComponent } from '../otp-customer/otp-customer.component';



@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  imgSrc: string = '/assets/img/default-avatar (1).png';
  selectedImg: any = null;
  userId;
  currenUser: any;
  customerListUpdate: FormGroup;
  customer: CustomerClient = new CustomerClient();
  customerId;
  URLImage;
  displayMessage: string;
  inputIDCard: string;
  notifition: string;
  inputEmail: string;
  emailCus: string;

  constructor(private customerService: CustomerClientServiceService,
    private storage: AngularFireStorage,
    private formBuilder: FormBuilder,
    private dialog: MatDialog, 
    private token: TokenStorageService) {
  }

  ngOnInit(): void {
    this.currenUser = this.token.getUser();
    this.customerListUpdate = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("^[^\\d\\t`~!@#$%^&*()_\\-+=|\\\\{}\\[\\]:;\"'<>,.?\\/]{4,50}$")]],
      phone: ['', [Validators.required, Validators.pattern("^0[35789]\\d{8}$")]],
      email: ['', [Validators.required, Validators.pattern("^(\\w+[a-z0-9]+\\.?)+[a-z0-9]+@([a-z]+\\.?)+[a-z]+$")]],
      gender: ['', [Validators.required,]],
      idCard: ['', [Validators.required, Validators.pattern("[0-9]{9}")]],
      dateOfBirth: ['', [Validators.required, dateOfBirth]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      img: ['', []],

    })

    this.userId = this.currenUser.id;
    this.customerService.findCustomerByIdUser(this.userId).subscribe((data1: any) => {
      this.imgSrc = data1.img;
      this.emailCus = data1.email;
      this.customerListUpdate.patchValue(data1);
      this.customerId = data1.id;
    })
  }

  getEmail(value) {
    console.log(value)
    this.inputEmail = value;
  }

  updateCustomer() {

    console.log(this.inputEmail)
    console.log(this.emailCus)

    if(this.inputEmail  == this.emailCus || this.inputEmail == undefined){
      console.log('ok')
    } else{
      console.log('xac nhan')
      // this.customerService.sendOTP(this.userId).subscribe(data => {
      // });
      // const dialogRef = this.dialog.open(OtpCustomerComponent, {
      //   width: '650px',
      // });
      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed');

      // });

    }
    


    this.createFileBase();
  }

  createFileBase() {
    if (this.customerListUpdate.controls.img.value != this.imgSrc) {
      const filePath = `undefined/${this.selectedImg.name}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImg).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((img) => {
            this.customerListUpdate.controls.img.setValue(img);
            this.customerService.updateCustomer(this.userId, this.customerListUpdate.value).subscribe(next => {
  
              const dialogRef = this.dialog.open(MessageComponent, {
                width: '650px',
                data: 'Chỉnh sửa thành công'
              });
              dialogRef.afterClosed();
            },error => {
              console.log(error == 400)
              if(error.status == 400){
                const dialogRef = this.dialog.open(MessageComponent, {
                  width: '650px',
                  data: 'fghfgfgfh'
                });dialogRef.afterClosed();
              }
              console.log(error.value)
              console.log('EROR' +error)
              
              
              
            });
          })
        })
      ).subscribe();
    } else {
      this.customerListUpdate.controls.img.setValue(this.imgSrc);
      this.customerService.updateCustomer(this.userId, this.customerListUpdate.value).subscribe(next => {
        console.log(next)
        const dialogRef = this.dialog.open(MessageComponent, {
          width: '650px',
          data: 'Chỉnh sửa thành công'
        });
        dialogRef.afterClosed();


      },error => {
        console.log(error.error !== '')
              if(error.error !== ''){
          
                const dialogRef = this.dialog.open(MessageComponent, {
                  width: '650px',
                  data: error.error
                });dialogRef.afterClosed();
              }else{
                const dialogRef = this.dialog.open(MessageComponent, {
                  width: '650px',
                  data: 'sadafs'
                });dialogRef.afterClosed();
              }
              console.log(error.value)
              console.log('EROR' +error)
        
      });
      ;
    }
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImg = event.target.files[0];
    } else {
      this.imgSrc = '/assets/img/default-avatar (1).png';
      this.selectedImg = null;
    }
  }

  openDialogCancel(){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '650px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }


}
