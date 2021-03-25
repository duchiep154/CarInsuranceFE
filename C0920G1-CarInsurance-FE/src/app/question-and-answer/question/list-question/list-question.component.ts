import {Component, OnInit} from '@angular/core';
import {QuestionServiceService} from '../../question-service.service';
import {MatDialog} from '@angular/material/dialog';
import {DeleteQuestionComponent} from '../delete-question/delete-question.component';
import {TokenStorageService} from '../../../security/service/token-storage.service';
import {EditQuestionComponent} from '../edit-question/edit-question.component';
import {CreatAnswerComponent} from '../../creat-answer/creat-answer.component';
import {QuestionAndAnswerComponent} from '../../question-and-answer.component';
import {QaService} from '../../qa.service';
import {EditAnswerComponent} from '../../edit-answer/edit-answer.component';
import {UsersService} from '../../../service/users.service';
import {Question} from '../../../models/qvsa/question';
import {Answer} from '../../../models/qvsa/answer';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.scss'],

})
//Phúc
export class ListQuestionComponent implements OnInit {

  isShown: boolean = true;
  listQuestion: any = [];
  listCheckAdminAnswer = [];
  size = 3;
  pageClicked = 0;
  pages = [];
  totalPages = 1;

  constructor(private questionService: QuestionServiceService, public dialog: MatDialog, private token: TokenStorageService,
              private qaService: QaService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

    this.findAll(this.pageClicked);

  }

  //Phúc
  //Hàm lấy list question phân trang
  findAll(page) {
    this.questionService.getAllQuestion(page, this.size).subscribe((result) => {
      this.listQuestion = result.content;
      this.pageClicked = page;
      this.totalPages = result.totalPages;
      this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);

      for (let i = 0; i < this.listQuestion.length; i++) {
        this.listCheckAdminAnswer[i] = true;
        if (this.listQuestion[i].users.username === 'admin') {
          this.listCheckAdminAnswer[i] = true;
        }
        for (let answer of this.listQuestion[i].answerSet) {
          if (answer.users.username === 'admin') {
            this.listCheckAdminAnswer[i] = false;
            break;
          }
        }
      }

      for (let i = 0; i < this.listQuestion.length; i++) {
        console.log(this.listQuestion[i].answerSet.length);
        this.buttonName[i] = 'Xem ' + this.listQuestion[i].answerSet.length + ' phản hồi';
        if (this.listQuestion[i].answerSet.length === 0) {
          this.buttonName[i] = '';
        }
      }

    });
  }


  //Phúc
  //Hàm phân trang
  onNext() {
    if (this.pageClicked < this.totalPages - 1) {
      this.pageClicked++;
      this.findAll(this.pageClicked);
    }
  }

  onPrevious() {
    if (this.pageClicked > 0) {
      this.pageClicked--;
      this.findAll(this.pageClicked);
    }
  }

  onFirst() {
    this.pageClicked = 0;
    this.findAll(this.pageClicked);
  }

  onLast() {
    this.pageClicked = this.totalPages - 1;
    this.findAll(this.pageClicked);
  }

  //Phúc
  //Hàm cho button chỉnh sửa question
  toggleShow(question) {
    if (this.token.getUser().id === question) {
      return this.isShown = true;
    } else {
      return this.isShown = false;
    }
  }

  //Phúc
  //Hàm hiển thị và không hiển thị câu trả lời
  listCheck = [];
  buttonName = [];

  toggle(questionId) {
    for (let i = 0; i < this.listQuestion.length; i++) {
      if (questionId === this.listQuestion[i].id) {
        console.log(this.listQuestion[i].answerSet.length);
        return this.listCheck[i] = true;
      }
    }
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


  //Phúc
  //Hàm xóa bằng dialog
  openDialogDelete(id) {
    let dialogRef = this.dialog.open(DeleteQuestionComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.questionService.deleteQuestion(id).subscribe(data => {
          this.findAll(this.pageClicked - 1);
          window.location.reload();
          this.snackBar.open('Đã xóa thành công', 'Chấp nhận')
        });
      }
    });
  }

  //Phúc
  //Hàm chỉnh sửa bằng dialog
  openDialogEdit(idToPass) {
    this.questionService.getQuestionById(idToPass).subscribe(data => {
      const dialogRef = this.dialog.open(EditQuestionComponent, {
        data: {
          idQ: idToPass
        },
      });
      console.log(this.pageClicked);
      dialogRef.afterClosed().subscribe(result => {
        console.log(this.pageClicked);
        this.findAll(this.pageClicked);
      });
    });
  }

  //Linh
  //Hàm thêm câu trả lời
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
      });
    })
  }

  //Linh
  //Hàm chỉnh sửa câu trả lơì
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

  checkSeen(id: any) {

  }
}
