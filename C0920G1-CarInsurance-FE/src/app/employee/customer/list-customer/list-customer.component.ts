import { EditCustomerEmployeeComponent } from '../edit-customer-employee/edit-customer-employee.component';
import { Component, OnInit } from '@angular/core';
import {CustomerServiceService} from "../../../service/customer-service.service";
import { MatDialog } from '@angular/material/dialog';
import { DeleteCustomerComponent } from '../delete-customer/delete-customer.component';
import {UsersService} from "../../../service/users.service";
import {FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DetailCustomerComponent} from "../detail-customer/detail-customer.component";
import { MessageComponent } from '../../admin/message/message.component';
// Thế Anh
@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {
  customers = [];
  size = 5;
  pageClicked = 0;
  totalPages = 1;
  pages = [];
  searchInput: string;
  birthdayStart: string;
  birthdayEnd: string;
  textSorting = '';
  onSorting = false ;
  dayByContract: string;
  loading: boolean;


  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  range1 = new FormGroup({
    start1: new FormControl(),
  });
  constructor(
    public customerService: CustomerServiceService,
    public dialog: MatDialog,
    public usersService: UsersService,
    private snackBar: MatSnackBar

) {
  }

  ngOnInit(): void {
    this.onSubmit(0)
  }

  // Thế anh lấy danh sách khách hàng kèm phân trang
  onSubmit(page) {
    this.customerService.getAllCustomer(page, this.size, this.onSorting, this.textSorting).subscribe(
      data => {
        console.log(data.content)
        this.customers = data.content;
        this.pageClicked = page;
        this.totalPages = data.totalPages;
        this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
      }
    );
  }

  // Thế Anh tìm phân trang
  search(page){
    this.customerService.getAllCustomerByName(this.searchInput , this.size).subscribe(data => {
      if (data == null) {
        this.searchInput = "";
        this.onSubmit(0);
      } else {
        this.customers = data.content;
        this.pageClicked = page;
        this.totalPages = data.totalPages;
        this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
      }
    });
  }

  searchByBirthday(page){
    console.log(this.birthdayStart);
    if (this.range.value.start == null){
      this.birthdayStart = '';
      this.birthdayEnd = ''
    }else {
      let date = new Date(this.range.value.start);
      let date1 = new Date(this.range.value.end);
      this.birthdayStart = date.getFullYear() + '-' + (((date.getMonth() + 1) > 9) ? (date.getMonth() + 1) : '0' +
        (date.getMonth() + 1)) + '-' + ((date.getDate() > 9) ? date.getDate() : '0' + date.getDate());
      this.birthdayEnd = date1.getFullYear() + '-' + (((date1.getMonth() + 1) > 9) ? (date1.getMonth() + 1) : '0' +
        (date1.getMonth() + 1)) + '-' + ((date1.getDate() > 9) ? date1.getDate() : '0' + date1.getDate());
      console.log(this.birthdayEnd)
    }
    this.customerService.searchCustomerByBirthdayy(this.birthdayStart , this.birthdayEnd , this.size).subscribe(data =>{
      console.log(data);
      if (data === null) {
      this.snackBar.open('Không có dữ liệu mà bạn tìm kiếm!', 'Đóng', {
          duration: 4000,
        });
      this.onSubmit(0);
    } else
      {
      this.customers =data.content;
      this.pageClicked = page;
      this.totalPages = data.totalPages;
      this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
    }
    })
  }

  searchByContractStartDay(page){
    if (this.range1.value.start1 == null){
      this.dayByContract = '';
    }else {
      let date = new Date(this.range1.value.start1);
      this.dayByContract = date.getFullYear() + '-' + (((date.getMonth() + 1) > 9) ? (date.getMonth() + 1) : '0' +
        (date.getMonth() + 1)) + '-' + ((date.getDate() > 9) ? date.getDate() : '0' + date.getDate());
    }
    this.customerService.searchCustomerByContractStartDay(this.dayByContract,this.size).subscribe(data =>{
      if (data === null) {
        this.snackBar.open('Không có dữ liệu mà bạn tìm kiếm!', 'Đóng', {
          duration: 4000,
        });
        this.onSubmit(0);
      } else
        {
          this.customers = data.content;
          this.pageClicked = page;
          this.totalPages = data.totalPages;
          this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
        }
        })
  }


  // Thế anh Phân Trang
  onNext(){
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


  // Thế anh sort
  onSortingChange(value) {
    if (this.textSorting == "") {
      this.textSorting = value;
    } else {
      this.textSorting = "";
    }
    this.ngOnInit();
  }
// Cre: nguyen bao
// nguyen bao open dialog delete
  openDeleteDialog(id: number) {
    this.customerService.getCustomerById(id).subscribe(result => {
      const dialogRef = this.dialog.open(DeleteCustomerComponent, {
        width: '30%',
        data: {data1: result},
        disableClose: true
      });
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        this.loading = true;
        if (confirmed == true) {
          this.customerService.deleteCustomer(id).subscribe(() => {
            const dialogRef = this.dialog.open(MessageComponent, {
              data: 'Xóa thành công.'
            });
            dialogRef.afterClosed();
            this.ngOnInit();
          }, error => {
            if (error.status === 400) {
              const dialogRef = this.dialog.open(MessageComponent, {
                data: 'Xóa không thành công vì khách hàng này còn hợp đồng.'
              });
              dialogRef.afterClosed();
            }
          });
        }
      });
    })
  }

// Dialog edit
// nguyen bao open dialog edit
  openEditDialog(id): void {
    this.customerService.getCustomerById(id).subscribe(result => {
      const dialogRef = this.dialog.open(EditCustomerEmployeeComponent, {
        width: '50%',
        data: {data1: result},
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(() => {
        this.ngOnInit();
      });
    })
  }
  openDetailDialog(id): void {
    this.customerService.getCustomerById(id).subscribe(result => {
      const dialogRef = this.dialog.open(DetailCustomerComponent, {
        width: '45%',
        data: {data1: result},
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    })
  }

  reaload() {
    window.location.reload()
  }
}
