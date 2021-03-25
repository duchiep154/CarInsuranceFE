import { DeleteCarComponent } from './../delete-car/delete-car.component';
import { Component, OnInit } from '@angular/core';
import { CarService } from "../../../service/car.service";
import { Car } from "../../../models/customer/car";
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../../admin/message/message.component';

@Component({
  selector: 'app-list-car',
  templateUrl: './list-car.component.html',
  styleUrls: ['./list-car.component.scss']
})
export class ListCarComponent implements OnInit {
  cars: Car[];
   size= 5;
   onSorting = false;
   textSorting = '';
  pageClicked = 0;
  pages = [];
  totalPages = 1;
  loading: boolean;

  constructor(
    private carService: CarService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getAllCar(0)
  }

// Thế Anh Lấy xe ra list
  getAllCar(page) {
    this.carService.getCars(page, this.size, this.onSorting, this.textSorting).subscribe(data => {
      this.cars = data,
        this.cars = data.content;
        this.pageClicked = page;
        this.totalPages = data.totalPages;
        this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
      }, error => {
        if (error.status === 204) {
        }
      }
    );
}
//Trang trước
  onNext() {
    if (this.pageClicked < this.totalPages - 1) {
      this.pageClicked++;
      this.getAllCar(this.pageClicked);
    }
  }

  //Trang sau
  onPrevious() {
    if (this.pageClicked > 0) {
      this.pageClicked--;
      this.getAllCar(this.pageClicked);
    }
  }

  //Trang đầu
  onFirst() {
    this.pageClicked = 0;
    this.getAllCar(this.pageClicked);
  }

  //Trang cuối
  onLast() {
    this.pageClicked = this.totalPages - 1;
    this.getAllCar(this.pageClicked);
  }

// nguyen bao mở dialog xóa xe theo id
  openDeleteDialog(id: number) {
    this.carService.getCarById(id).subscribe(result => {
      const dialogRef = this.dialog.open(DeleteCarComponent, {
        width: '30%',
        data: {data1: result},
        disableClose: true
      });
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        this.loading = true;
        if (confirmed == true) {
          this.carService.deleteCar(id).subscribe(() => {
            const dialogRef = this.dialog.open(MessageComponent, {
              data: 'Xóa thành công.'
            });
            dialogRef.afterClosed();
            this.ngOnInit();
          }, error => {
            if (error.status === 400) {
              const dialogRef = this.dialog.open(MessageComponent, {
                data: 'Xóa không thành công vì xe này còn hợp đồng.'
              });
              dialogRef.afterClosed();
            }
          });
        }
      });
    })
  }
  //////Cre: nguyen bao//////
}
