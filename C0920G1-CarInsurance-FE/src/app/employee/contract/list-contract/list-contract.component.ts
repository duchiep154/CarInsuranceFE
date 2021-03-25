import {Component, OnInit} from '@angular/core';
import {MessageComponent} from "../../admin/message/message.component";
import {MatDialog} from "@angular/material/dialog";
import {Contract} from "../../../models/contract/contract";
import {DeleteContractComponent} from "../delete-contract/delete-contract.component";
import {Router} from "@angular/router";
import {ContractService} from "../../../client/contract/contract.service";

@Component({
  selector: 'app-list-contract',
  templateUrl: './list-contract.component.html',
  styleUrls: ['./list-contract.component.scss']
})
export class ListContractComponent implements OnInit {
  contractList: Contract[] = [];
  loading = false;

  constructor(private contractService: ContractService,
              private dialog: MatDialog,
              public router: Router) {}
  searchInput ="";
  contracts:  any[];
  textSorting = "";
  size = 5;
  pageClicked = 0;
  pages = [];
  totalPages = 1;
  onSorting = false;
  isMessage = false;

  ngOnInit(): void {
    this.isMessage = false;
    this.onSubmit(0);
  }

  onSubmit(page) {
    this.contractService.getAllContracts(page, this.size, this.onSorting, this.textSorting).subscribe(
      data => {
        console.log('aaaaaaaaaaaaaaabbbbbbbbbb');
        console.log(data.content);
        this.contracts = data.content;
        // console.log(this.contracts);
        this.pageClicked = page;
        this.totalPages = data.totalPages;
        this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
      }, error => {
        if (error.status === 204) {
          this.isMessage = true;
        }
      }
    );
  }

  search(page) {
      this.contractService.getAllContractByEndOrStartDate(this.searchInput, this.size).subscribe(data => {
        if (data == null) {
          this.pageClicked = 0;
          this.pages = [];
          this.totalPages = 1;
          this.isMessage = true;
          this.contracts = [];
        } else {
          this.isMessage = false;
          this.contracts = data.content;
          this.pageClicked = page;
          this.totalPages = data.totalPages;
          this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
        }
      });
  }

  approval(id, duration) {
    this.contractService.approval(id, duration).subscribe(data => {
      this.ngOnInit();
      setTimeout(() => {
        const dialogRef = this.dialog.open(MessageComponent, {
          data: 'Phê duyệt thành công.'
        });
        dialogRef.afterClosed();
      }, 200);
    },)
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

  onSortingChange(value) {
    this.onSorting = !this.onSorting;
    this.textSorting = value;
    this.ngOnInit();
  }



deleteContract(id: number) {
  // @ts-ignore
  const contractByIdId = this.contractList.find(item => item.id === id);
  const dialogRef = this.dialog.open(DeleteContractComponent, {
    data: contractByIdId && contractByIdId.id
  });
  dialogRef.afterClosed().subscribe((confirmed: boolean) => {
    this.loading = true;
    if (confirmed == true) {
      this.contractService.delete(id).subscribe(data => {
        const dialogRef = this.dialog.open(MessageComponent, {
          data: 'Xóa thành công hợp đồng.'
        });
        dialogRef.afterClosed();
        this.ngOnInit();
      }, error => {
        if (error.status === 500) {
          const dialogRef = this.dialog.open(MessageComponent, {
            data: 'Xóa không thành công vì hợp đồng này đã thanh toán.'
          });
          dialogRef.afterClosed();
        }
      });
    }
  });
}
}
