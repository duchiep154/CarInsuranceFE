import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Accident} from "../../../../models/contract/accident";
import {AccidentService} from "../../../../api-service/accident.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-not-approval',
  templateUrl: './not-approval.component.html',
  styleUrls: ['./not-approval.component.scss']
})
export class NotApprovalComponent implements OnInit {

  accidents: Accident[] = [];
  search = '';
  pages = [];
  pageClicked = 0;
  totalPages;
  size = 5;
  @Output() voteId = new EventEmitter();
  constructor(
    private accidentService: AccidentService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllAccident();
  }

  getAllAccident(){
    this.onSubmit(this.pageClicked);
  }

  getValueSearch(value){
    this.search = value;
  }

  getSearch() {
    this.onSubmit(this.pageClicked = 0);
  }

  onSubmit(page) {
    this.accidentService.findAccidentNotApproval(page, this.search, this.size).subscribe(value => {
      {
        this.pages = new Array<any>(value.totalPages);
        this.accidents = value.content;
        this.pageClicked = page;
        this.totalPages = value.totalPages;
        this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
      }
    });
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

  showInfo(id: number) {
    this.voteId.emit(id);
  }
}
