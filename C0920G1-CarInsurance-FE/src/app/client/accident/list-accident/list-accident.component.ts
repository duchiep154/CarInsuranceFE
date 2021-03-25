import {Component, OnInit} from '@angular/core';
import {Accident} from "../../../models/contract/accident";
import {AccidentClientService} from "../../../api-service/accident-client.service";
import {TokenStorageService} from "../../../security/service/token-storage.service";

@Component({
  selector: 'app-list-accident',
  templateUrl: './list-accident.component.html',
  styleUrls: ['./list-accident.component.scss']
})
export class ListAccidentComponent implements OnInit {
  public accidents: Accident[] = [];
  public userName: String;

  constructor(private accidentClientService: AccidentClientService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.userName = this.tokenStorageService.getUser().username;
    this.accidentClientService.getListAccident().subscribe(data => {
      this.accidents = data;
    })
  }

  // openDialog(customerId): void {
  //   this.accidentClientService.getListAccident(customerId).subscribe(dataCustomer => {
  //     const dialogRef = this.dialog.open(CustomerDeleteComponent, {
  //       width: '500px',
  //       data: {data1: dataCustomer},
  //       disableClose: true,
  //     });
  //
  //     dialogRef.afterClosed().subscribe(result => {
  //       console.log('The dialog was closed');
  //       this.ngOnInit();
  //     });
  //   });
  // }
}
