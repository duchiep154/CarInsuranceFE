import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuestionServiceService} from '../../question-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ListQuestionComponent} from '../list-question/list-question.component';


@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})

// Phúc
export class EditQuestionComponent implements OnInit {
  formQuestion: FormGroup;
  public date = new Date();
  loading = false;
  listError: any = "";


  constructor(private fb: FormBuilder, private questionService : QuestionServiceService,
              private route: ActivatedRoute, private router: Router,  private datePipe: DatePipe,
              @Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<EditQuestionComponent>,private snackBar: MatSnackBar
              ) { }

  ngOnInit(): void {
    this.pickQuestion();
  }

  //Phúc
  //Hàm lấy question theo id
  pickQuestion(){
    this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.formQuestion = this.fb.group({
      id:[''],
      contentQuestion: ['',[Validators.required, Validators.minLength(30)]],
      dateQuestion: [this.date],
      status: [''],
    });
    const id = this.data.idQ;
    this.questionService.getQuestionById(id).subscribe(data => {
      this.formQuestion.setValue(data);
    })
  }

  //Phúc
  //Hàm update question và bắt validate
  updateQuestion() {
    this.loading = true;
    if (this.formQuestion.valid) {
      this.questionService.updateQuestionById(this.data.idQ, this.formQuestion.value).subscribe(data => {
        this.dialogRef.close();
        this.snackBar.open('Đã sửa câu hỏi thành công', 'Chấp nhận');
        }, error => {
          if (error.status === 400) {
            this.listError = error.error;
          } else if (error.status === 401) {

            this.router.navigateByUrl("/questions");
          } else if (error.status === 403) {

          }
        }, () => {
          this.loading = false;
        }
      )
    }
  }
}
