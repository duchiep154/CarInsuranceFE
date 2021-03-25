
// Khanh
import {Component, OnInit} from '@angular/core';

import {ContractService} from "../contract.service";
import {MatDialog} from "@angular/material/dialog";
import {DetailContractComponent} from "../detail-contract/detail-contract.component";
import {TokenStorageService} from "../../../security/service/token-storage.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CreateContractComponent} from "../create-contract/create-contract.component";
import {element} from "protractor";
import {BillListDTO} from "../../../checkout/model/billListDTO";
import {PaymentService} from "../../../checkout/service/payment.service";
import {Contract} from "../../../models/contract/contract";
import {Router} from "@angular/router";


@Component({
  selector: 'app-list-contract',
  templateUrl: './list-contract.component.html',
  styleUrls: ['./list-contract.component.scss']
})
export class ListContractComponent implements OnInit {

  listContractPay :Contract[]=[];
  listContract;
  //id user
  idUser = '';
  //dateOfDatePicker
  startDateOfDatePicker;
  endDateOfDatePicker;

  loading = false;
  pages = [];
  pageClicked = 0;
  totalPages;
  size = 5;

  inputText;

  idContract = '';
  statusPay = '';


  role;

  //tính tổng tiền
  totalPay = 0.0

  listItem = [];

  item = {isChecked: false, id: 0};



  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  listTest;


  billList = new BillListDTO;

  allComplete: boolean = false;
  checkTotal: any;

  constructor(private contractService: ContractService,
              private tokenStorage: TokenStorageService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              public router: Router,
              private paymentService: PaymentService,
              public dialog: MatDialog,) {
  }

  ngOnInit(): void {
    this.loading = true;
    if (this.contractService.getStatusMessage()) {
      this.contractService.setStatusMessage()
      this.snackBar.open('Đã tạo mới 1 hợp đồng', '', {
        duration: 4000,
        panelClass: 'valid-snackbar'
      });
    }
    this.idUser = this.tokenStorage.getUser().id
    this.getAllContract()

    this.loading = false;
    //Hiep
    this.openCheckout()

  }

  // totalCheck() {
  //   if (!this.checkTotal) {
  //     for (let i = 0; i < this.listContract.length; i++) {
  //       this.sumMoney(this.listContract[i])
  //     }
  //   } else {
  //     this.totalPay = 0;
  //   }
  // }

  sumMoney(value) {
    this.loading = true;
    if (!value.isChecked) {
      for (let i = 0; i < this.listItem.length; i++) {
        if (this.listItem[i].id === value.id) {
          this.listItem[i].isChecked = true;
        } else {
          this.listItem.push({isChecked: true, id: value.id})
        }
      }
      this.item.id = value.id;
      this.item.isChecked = value.isChecked

      this.totalPay += parseFloat(value.totalMoney)
    } else {
      for (let i = 0; i < this.listItem.length; i++) {
        if (this.listItem[i].id === value.id) {
          this.listItem[i].isChecked = false;
        } else {
          this.listItem.push({isChecked: false, id: value.id})

        }
      }
      this.item.id = value.id;
      this.item.isChecked = value.isChecked
      this.totalPay -= parseFloat(value.totalMoney)
    }
    this.loading = false;
  }


  approval(idContract){
    this.contractService.setApproval(idContract, this.idUser, 0, this.size).subscribe(data => {
      this.pages = new Array<any>(data.totalPages);
      this.listContract = data.content;
      this.pageClicked = 0;
      this.totalPages = data.totalPages;
      this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
    })
  }

  getAllContract() {
    this.onSubmit(this.pageClicked);
  }

  openDiablogCreate(): void {
    const dialogRef = this.dialog.open(CreateContractComponent, {
      width: '800px',
      maxHeight: '90vh',
      disableClose: true
    })
    dialogRef.afterClosed().subscribe(data => {
      this.ngOnInit();
    });
  }

  openDialog(id): void {
    this.contractService.getContractById(id).subscribe(result => {
      const dialogRef = this.dialog.open(DetailContractComponent, {
        width: '500px',
        data: {data1: result},
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(data => {
        this.ngOnInit();
      });
    });
  }

  formatDateOfRangeDatePicker() {
    if (this.range.value.start == null && this.range.value.end == null) {
      this.startDateOfDatePicker = '';
      this.endDateOfDatePicker = ''
    } else {
      let date = new Date(this.range.value.start)
      let date1 = new Date(this.range.value.end)
      this.startDateOfDatePicker = date.getFullYear() + '-' + (((date.getMonth() + 1) > 9) ? (date.getMonth() + 1) : '0' +
        (date.getMonth() + 1)) + '-' + ((date.getDate() > 9) ? date.getDate() : '0' + date.getDate())
      this.endDateOfDatePicker = date1.getFullYear() + '-' + (((date1.getMonth() + 1) > 9) ? (date1.getMonth() + 1) : '0' +
        (date1.getMonth() + 1)) + '-' + ((date1.getDate() > 9) ? date1.getDate() : '0' + date1.getDate())
    }
  }

  pushElementToArray(data) {
    if (this.listContract != undefined) {
      this.listTest = data.content;
      for (let i = 0; i < this.listTest.length; i++) {
        this.listTest[i].isChecked = false;
        for (let j = 0; j < this.listItem.length; j++) {
          if (this.listTest[i].id === this.listItem[j].id) {
            this.listTest[i].isChecked = this.listItem[j].isChecked

          }
        }
      }
      this.listContract = this.listTest
    } else {
      this.listItem.push(this.item)

      this.listContract = data.content;
      for (let i = 0; i < this.listContract.length; i++) {
        this.listContract[i].isChecked = false;

      }
    }
  }

  onSubmit(page) {
    console.log(this.range.controls.start)
    this.loading = true;
    this.formatDateOfRangeDatePicker();
    this.contractService.getAllContract(page, this.idUser, this.size, this.idContract, this.startDateOfDatePicker,
      this.endDateOfDatePicker, this.statusPay).subscribe(
      data => {

          this.pages = new Array<any>(data.totalPages);
          this.pushElementToArray(data);
          this.pageClicked = page;
          this.totalPages = data.totalPages;
          this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
          this.loading = false;

      }, error => {
        console.log(error);
        this.snackBar.open('Không có dữ liệu mà bạn tìm kiếm!', 'Đóng', {
          duration: 4000,
        });
        this.loading = false;
      }
    );
  }

  onNext() {
    if (this.pageClicked < this.totalPages - 1) {
      this.pageClicked++;
      this.onSubmit(this.pageClicked);
    }
  }

  onPrevious() {
    if (this.pageClicked > 0) {
      this.pageClicked--;
      this.onSubmit(this.pageClicked);
    }
  }

  onFirst() {
    this.pageClicked = 0;
    this.onSubmit(this.pageClicked);
  }

  onLast() {
    this.pageClicked = this.totalPages - 1;
    this.onSubmit(this.pageClicked);
  }

  openCheckout()  {




    this.billList.totalPay=this.totalPay;

    this.billList.contractList=this.listContractPay;
   this.paymentService.creatBillPaymentOffline(this.billList);
  }

}

// Khanh

