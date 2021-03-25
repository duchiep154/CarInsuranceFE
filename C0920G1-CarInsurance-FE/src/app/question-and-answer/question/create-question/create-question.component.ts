import { Component, OnInit } from '@angular/core';
import {QuestionServiceService} from '../../question-service.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Users} from '../../../models/account/users';
import {DatePipe} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})

//Phúc
export class CreateQuestionComponent implements OnInit {
  formQuestion: FormGroup;
  user = new Users();
  public date = new Date();
  listError: any = "";
  loading = false;

  constructor(private questionService: QuestionServiceService, private router: Router,private fb: FormBuilder, private datePipe: DatePipe,
  private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

    this.datePipe.transform(this.date);
    this.formQuestion = this.fb.group({
      id:[''],
      contentQuestion: ['',  [Validators.minLength(30)]],
      dateQuestion: [this.date],
      status: ['chua xem'],
    });
  }

  //Phúc
  //Hàm add question và bắt lỗi validate
  save() {
    this.loading = true;
    if (this.formQuestion.valid) {
      this.questionService.createQuestion(this.formQuestion.value).subscribe(data => {
          window.location.reload();
          this.snackBar.open('Đã gửi câu hỏi thành công', 'Chấp nhận');
      }, error => {
          if (error.status === 400) {
            this.listError = error.error;
            console.log(this.listError)
          }else if (error.status === 401) {
            this.listError = error.error;
          }else if (error.status === 403) {
            this.listError = error.error;
          }
          else {
            this.listError = error.error;
          }
        },() => {
          this.loading = false;
        }
      )
    }
  }



}
