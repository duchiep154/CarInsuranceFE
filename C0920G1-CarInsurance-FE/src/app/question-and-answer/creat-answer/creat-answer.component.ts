import {Component, Inject, OnInit} from '@angular/core';
import { QaService } from "../qa.service";
import { MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-creat-answer',
  templateUrl: './creat-answer.component.html',
  styleUrls: ['./creat-answer.component.scss']
})
export class CreatAnswerComponent implements OnInit {

  public formCreat: FormGroup;
  public idQuestion;

  constructor(
    public dialogRef: MatDialogRef<CreatAnswerComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    public qaService: QaService,
    public formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit(): void {
    this.idQuestion = this.data.data1.id;
    this.formCreat = this.formBuilder.group({
      contentAnswer: ['', [Validators.required]]
    })
  }

  onClose(): void{
    this.dialogRef.close();
  }

  creatAnswer(): void{
    this.qaService.creatAnswer(this.idQuestion,this.formCreat.value).subscribe(data => {
      this.dialogRef.close();
      this.openSnackBar("Thêm mới câu trả lời thành công !","X");
    })
  }
}
