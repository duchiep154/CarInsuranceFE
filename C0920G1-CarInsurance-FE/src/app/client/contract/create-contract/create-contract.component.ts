//<Khanh>
import {Component, Inject, Input, LOCALE_ID, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {ContractService} from "../contract.service";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {TokenStorageService} from "../../../security/service/token-storage.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
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
function validateYearManufacturing(c: AbstractControl) {
  const v = c.value;
  let dateNow = new Date()
  return (parseInt(v.yearManufacturing) >= 2000 && parseInt(v.yearManufacturing) <= dateNow.getFullYear()) ? null :
    {wrongYear: true};
}
function validateNumberPlate(listCar: any[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    // if (control.value !== undefined && (isNaN(control.value) || control.value < min || control.value > max)) {
    //   return { 'ageRange': true };
    // }
    return null;
  };
}

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    {provide: LOCALE_ID, useValue: 'vi'}
  ]
})
export class CreateContractComponent implements OnInit {
  myControl: FormControl =  new FormControl();
  filteredOptions: Observable<string[]>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;



  //validateDatePicker
  minDate = new Date();

  //get Customer
  customer= {id: 0, name: '', address: ''};

  thirdFormGroup: FormGroup;
  formGroup: FormGroup;
  listProduct = [];
  listEmployee = [];
  listCar = [];
  dateChange = '';
  period;
  newDate;
  chooseCarYes: boolean
  chooseCarNo: boolean
  productName: string;

  car;
  // Thông tin car
  numberPlate;
  carIdNumber;
  manufacturer;
  yearManufacturing;
  // Tính thời hạn
  time;
  // tính tổng tiền
  totalMoney;
  //check confirm
  checkConfirm;


  //showError
  messageError: any = "";

  check;

  //message hiển thị lỗi nhập tên product
  messageErrorProduct;
  messageDuplicationNumberPlate;
  loading: boolean;
  chooseCar: boolean;

  constructor(private formBuilder: FormBuilder,
              private contractService: ContractService,
              private tokenStorage: TokenStorageService,
              public router: Router,
              public dialogRef: MatDialogRef<CreateContractComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.contractService.getCustomer(this.tokenStorage.getUser().id).subscribe(data => {
      this.customer = data;
    })
    this.car = [];
    this.contractService.getAllCar(this.tokenStorage.getUser().id).subscribe(data => {
      this.listCar = data;
    })
    // this.contractService.getCar(1).subscribe(data => {
    //   this.car = data
    // })
    this.contractService.getAllProduct().subscribe(data => {
      this.listProduct = data;
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(val => this.filter(val))
        );
    })
    this.contractService.getAllEmployee().subscribe(data => {
      this.listEmployee = data;
    })
    this.formGroup = this.formBuilder.group({
      stepOne: this.formBuilder.group({
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        time: ['', Validators.required],
        statusApproval: ['0'],
        statusPay: ['0'],
        product: ['', Validators.required]
      }),
        car: [''],
        carCheck: ['', Validators.required],
        id: ['', Validators.required],
        name: ['', Validators.required],
        address: ['', Validators.required],
        carIdNumber: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]{9,12}$')]],
        numberPlate: ['', [Validators.required, Validators.pattern('^[0-9]{2}[A-Z][0-9][-][0-9]{4,5}$')]],
        manufacturer: ['', [Validators.required, Validators.pattern('^[A-Z]{1,20}$')]],
        yearManufacturing: ['', [Validators.required]]
    },{validator: validateYearManufacturing})
    this.thirdFormGroup = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      time: ['', Validators.required],
      product: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      numberPlate: ['', Validators.required],
      money: ['', Validators.required],
      checkConfirm: ['', Validators.required]
    });this.loading = false;
  }
  checkProduct(){
    this.contractService.checkProduct(this.formGroup.controls.stepOne.value.product).subscribe(data => {
      this.messageErrorProduct = ''
    }, error => {
      this.messageErrorProduct = error.error
    })
  }
  checkNumberPlate(){
    this.contractService.checkNumberPlate(this.formGroup.value.numberPlate).subscribe(data => {
      this.messageDuplicationNumberPlate = 'Biển số đã bị trùng, vui lòng nhập lại.'
    }, error => {
      this.messageDuplicationNumberPlate = '';
    })
  }


  save(){
    this.loading = true
    this.contractService.createContract(this.formGroup.value).subscribe(data => {
      // this.contractService.setStatusMessage();
      // this.router.navigateByUrl('list-contract');
      this.dialogRef.close();
      this.snackBar.open('Đã thêm mới 1 hợp đồng', 'Đóng', {
        duration: 4000,
        panelClass: 'valid-snackbar'
      });this.loading = false
    },error =>{
      this.check = true;
      this.messageError = error.error;
      this.loading = false;
    });
  }
  getMoney(){
    this.contractService.checkProduct(this.productName).subscribe(data => {
      this.totalMoney = data.productPrice * this.time;
    })
  }
  filter(val: string): string[] {
    return this.listProduct.map(x => x.name).filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }
  checkCar(value){
    if (value){
      this.chooseCarYes = value
      this.chooseCarNo = !value
    }else {
      this.chooseCarYes = value
      this.chooseCarNo = !value
    }

  }
  getCar(idCar){
    this.contractService.getCar(idCar).subscribe(data => {
      this.car = data;
    })
  }
  getDate(startDate: any) {
    this.newDate = new Date(startDate);
    this.getEndDate()
  }
  getTime(value){
    this.period = value;
    this.getEndDate()
  }
  getEndDate(){
    this.dateChange = (this.newDate.getDate() > 9 ? this.newDate.getDate() : '0' + this.newDate.getDate()) + '-'
      + ((this.newDate.getMonth() + 1) > 9 ? (this.newDate.getMonth() + 1) : '0' + (this.newDate.getMonth() + 1))
      + '-' + (this.newDate.getFullYear() + this.period)
  }


}
//</Khanh>
