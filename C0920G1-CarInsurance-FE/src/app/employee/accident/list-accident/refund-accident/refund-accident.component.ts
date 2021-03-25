import {Component, OnInit} from '@angular/core';
import {AccidentDTO} from "../../../../models/contract/accident-dto";
import {AccidentService} from "../../../../api-service/accident.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
//cường
@Component({
  selector: 'app-refund-accident',
  templateUrl: './refund-accident.component.html',
  styleUrls: ['./refund-accident.component.scss']
})
export class RefundAccidentComponent implements OnInit {
  public accident: AccidentDTO;
  private id: number;

  constructor(
    private accidentService: AccidentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.findAccidentById();

  }

  findAccidentById() {
    this.activatedRoute.params.subscribe(data => {
      this.id = Number(data.id);
      this.accidentService.findAccidentById(this.id).subscribe(data1 => {
        this.accident = data1
      })
    });
  }

  refund() {
    this.accidentService.updateAccidentWasRefunded(this.accident.customerMail, this.id).subscribe(data => {
      this.router.navigateByUrl("/employee/accident");
      this.snackBar.open('Thanh toán thành công', '', {
        duration: 4000,
      })
    })
  }
}
