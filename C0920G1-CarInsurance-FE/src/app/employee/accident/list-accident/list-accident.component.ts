import {Component, OnInit, ViewChild} from '@angular/core';
import {Accident} from "../../../models/contract/accident";
import {AccidentService} from "../../../api-service/accident.service";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {AccidentDTO} from "../../../models/contract/accident-dto";
import {WaitingApprovalComponent} from "./waiting-approval/waiting-approval.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NotApprovalComponent} from "./not-approval/not-approval.component";
import {WasApprovalComponent} from "./was-approval/was-approval.component";
import {RefundAccidentComponent} from "./refund-accident/refund-accident.component";

@Component({
  selector: 'app-list-accident',
  templateUrl: './list-accident.component.html',
  styleUrls: ['./list-accident.component.scss'],
})
export class ListAccidentComponent implements OnInit {

  accident: AccidentDTO;
  listImg: string[];
  style = 'display: none';
  src = '';
  checkRatio = false;
  checkMoney = 0;
  notApproval;
  path: string;
  loading = false;
  idAccident;
  notApprovalReason: string;
  checkSubmit = false;
  showValidNull = '';
  checkSubmitWasOrNot = false;
  @ViewChild(WaitingApprovalComponent) waitingCPN: WaitingApprovalComponent;
  @ViewChild(NotApprovalComponent) notCPN: NotApprovalComponent;
  @ViewChild(WasApprovalComponent) wasCPN: WasApprovalComponent;

  constructor(
    private accidentService: AccidentService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.accidentService.findAccidentById(1).subscribe(value => {
      this.accident = value;
      this.listImg = this.accident.accidentImg.split(',');
    });
  }

  voteId(value) {
    this.idAccident = value;
    console.log(value);
    this.accidentService.findAccidentById(value).subscribe(data => {
      this.accident = data;
      this.listImg = this.accident.accidentImg.split(',');
      this.notApproval = this.accident.notApprovalReason;
    });
  }

  showBigImg(value) {
    this.src = value;
    this.style = 'position: fixed; top: 60px; left: 1080px; z-index: 1000; display: block'
  }

  closeBigImg() {
    this.style = 'display: none'
  }

  changeRatio(value) {
    if (value == 0) {
      this.checkRatio = false;
      this.accident.notApprovalReason = this.notApproval;
      this.checkSubmitWasOrNot = false;
      this.checkSubmit = false;
      this.showValidNull = 'C???n ph???i nh???p l?? do kh??ng ?????n b?? khi ti???n b???ng 0';
    } else {
      this.checkSubmitWasOrNot = true;
      this.checkRatio = true;
      this.accident.notApprovalReason = 'Kh??ng';
      this.checkSubmit = true;
      this.showValidNull = '';
    }
    this.checkMoney = parseFloat(this.accident.productPrice);
    this.checkMoney = this.checkMoney * value / 100;
  }

  wasApproval() {
    if (this.checkSubmit && this.checkSubmitWasOrNot) {
      this.loading = true;
      const elementPDF = document.getElementById('contentPdf');
      html2canvas(elementPDF).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');

        document.body.appendChild(document.createElement('a'));
        const doc = new jsPDF('p','pt','a4');
        const imgHeight = canvas.height * 208 / canvas.width;
        doc.addImage(imgData, 0, 0, 208, imgHeight);
        this.path = doc.output('datauristring') + ',' + this.idAccident + ',' + this.checkMoney
          + ',' + this.accident.customerMail;
        this.accidentService.updateAccidentWasApproval(this.path).subscribe(
          value => {
          }, error => {
            this.loading = false;
            if (error == 404) {
              this.snackBar.open('G???i mail b??? l???i', '', {
                  duration: 4000,
                }
              );
            }
            if (error == 400) {
              this.snackBar.open('Mai n??y ???? ???????c g???i ??i t??? n??i kh??c', '', {
                  duration: 4000,
                }
              );
            }
          }, () => {
            this.loading = false;
            this.snackBar.open('Mai ???? g???i', '', {
                duration: 4000,
              }
            );
            this.waitingCPN.ngOnInit();
            this.wasCPN.ngOnInit();
            this.notCPN.ngOnInit();
          });
      });
    } else {
      this.showValidNull = 'B???n c???n l??m ????ng th??? t???c.';
      this.snackBar.open('B???n c???n l??m ????ng th??? t???c.', '', {
          duration: 4000,
        }
      );
    }
  }

  changeNotApprovalReason(value) {
    this.notApprovalReason = value;
    console.log(value);
    if (value != '' && value != 'Kh??ng' && value != 'kh??ng') {
      this.checkSubmit = true;
      this.showValidNull = '';
    } else {
      this.checkSubmit = false;
      this.showValidNull = 'C???n ph???i nh???p l?? do kh??ng ?????n b?? khi ti???n b???ng 0';
    }
  }

  notApprovalSendMai() {
    if (this.checkSubmit && !this.checkSubmitWasOrNot) {
      this.loading = true;
      const elementPDF = document.getElementById('contentPdf');
      html2canvas(elementPDF).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF();
        const imgHeight = canvas.height * 208 / canvas.width;
        doc.addImage(imgData, 0, 0, 208, imgHeight);
        this.path = doc.output('datauristring') + ',' + this.idAccident + ',' + this.notApprovalReason
          + ',' + this.accident.customerMail;
        this.accidentService.updateAccidentNotApproval(this.path).subscribe(value => {
        }, error => {
          this.loading = false;
          if (error == 404) {
            this.snackBar.open('G???i mail b??? l???i', '', {
                duration: 4000,
              }
            );
          }
          if (error == 400) {
            this.snackBar.open('Mai n??y ???? ???????c g???i ??i t??? n??i kh??c', '', {
                duration: 4000,
              }
            );
          }
        }, () => {
          this.loading = false;
          this.snackBar.open('Mai ???? g???i', '', {
              duration: 4000,
            }
          );
          this.waitingCPN.ngOnInit();
          this.notCPN.ngOnInit();
        });
      });
    } else {
      this.showValidNull = 'B???n c???n l??m ????ng th??? t???c.';
      this.snackBar.open('B???n c???n l??m ????ng th??? t???c.', '', {
          duration: 4000,
        }
      );
    }
  }
}
