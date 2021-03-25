import {Component, Inject, OnInit} from '@angular/core';
import { QaService } from "../qa.service";
import { MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-answer',
  templateUrl: './edit-answer.component.html',
  styleUrls: ['./edit-answer.component.scss']
})
export class EditAnswerComponent implements OnInit {
  public formEdit: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditAnswerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public qaService: QaService,
    public formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  ngOnInit(): void {
    this.formEdit = this.formBuilder.group({
      contentAnswer: ['', [Validators.required]]
    });
    console.log(this.data.data1);
    this.formEdit.patchValue(this.data.data1);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  editAnswer(){
    this.qaService.editAnswer(this.data.data1.id,this.formEdit.value).subscribe(data => {
      if (data == null){
        this.dialogRef.close();
        this.openSnackBar("Chỉnh sửa thành công !", "X");
      }
    }, error => {
      this.dialogRef.close();
      this.openSnackBar("Câu trả lời đã được xem không thể chỉnh sửa !", "X");
    })
  }
}
