import {Component, OnInit} from '@angular/core';
import {QaService} from "./qa.service";
import {MatDialog} from "@angular/material/dialog";
import {CreatAnswerComponent} from "./creat-answer/creat-answer.component";
import {EditAnswerComponent} from "./edit-answer/edit-answer.component";
import {TokenStorageService} from "../security/service/token-storage.service";
import {Question} from "../models/qvsa/question";

@Component({
  selector: 'app-question-and-answer',
  templateUrl: './question-and-answer.component.html',
  styleUrls: ['./question-and-answer.component.scss']
})
export class QuestionAndAnswerComponent implements OnInit {

  public questionList: any = [];
  p: any;
  isShown: boolean = true;
  question: Question;
  status: any ;
  constructor(
    public qaService: QaService,
    public dialog: MatDialog,
    private token: TokenStorageService
  ) {
  }

  ngOnInit(): void {
    this.qaService.listQA().subscribe(data => {
      console.log(this.questionList);
      this.questionList = data;
    })
  }

  openCreateDialog(questionId): void {
    this.qaService.getQuestionId(questionId).subscribe(dataOfQuestion => {
      const dialogRef = this.dialog.open(CreatAnswerComponent, {
        width: '650px',
        maxHeight: '150vh',
        data: {data1: dataOfQuestion},
        disableClose: false
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      })
    })
  }

  openEditDialog(answerId): void {
    this.qaService.getAnswerId(answerId).subscribe(dataOfAnswer => {
      const dialogRef = this.dialog.open(EditAnswerComponent, {
        width: '650px',
        maxHeight: '150vh',
        data: {data1: dataOfAnswer},
        disableClose: false
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      })
    })
  }

  //Linh
  //Hàm cho button chỉnh sửa answer
  toggleShowAnswer(answer: number) {
    if (this.token.getUser().id === answer) {
      return this.isShown = true;
    } else {
      return this.isShown = false;
    }
  }

  checkSeen(answerId: number) {
    this.qaService.getStatus(answerId).subscribe(data =>{
        this.status = data;
    })
  }
}
