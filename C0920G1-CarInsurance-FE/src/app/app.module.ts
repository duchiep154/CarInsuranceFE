import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ClientModule} from './client/client.module';
import { QuestionAndAnswerComponent } from './question-and-answer/question-and-answer.component';
import { environment } from '../environments/environment';
import {HttpClientModule} from "@angular/common/http";
import { ListQuestionComponent } from './question-and-answer/question/list-question/list-question.component';
import { CreateQuestionComponent } from './question-and-answer/question/create-question/create-question.component';
import {DatePipe} from '@angular/common';
import { EditQuestionComponent } from './question-and-answer/question/edit-question/edit-question.component';
import {EmployeeModule} from './employee/employee.module';
import {SecurityModule} from "./security/security.module";
import {authInterceptorProviders} from "./security/helper/auth.interceptor";
import { DeleteQuestionComponent } from './question-and-answer/question/delete-question/delete-question.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { CreatAnswerComponent } from './question-and-answer/creat-answer/creat-answer.component';
import { EditAnswerComponent } from './question-and-answer/edit-answer/edit-answer.component';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MaterialModule} from "./material/material.module";
import { NotFoundComponent } from './not-found/not-found.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxPaginationModule } from 'ngx-pagination';
import {CustomerSnackbarComponent} from "./security/login/login.component";
import {BillDetailComponent} from "./checkout/component/bill-detail/bill-detail.component";
import {SuccessComponent} from "./checkout/component/success/success.component";
import {OfflineComponent} from "./checkout/component/offline/offline.component";
import {CheckoutModule} from "./checkout/checkout.module";
import {MatTabsModule} from "@angular/material/tabs";
import {MAT_DATE_LOCALE} from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent,
    QuestionAndAnswerComponent,
    NotFoundComponent,
    ListQuestionComponent,
    CreateQuestionComponent,
    EditQuestionComponent,
    DeleteQuestionComponent,
    CustomerSnackbarComponent,
    CreatAnswerComponent,
    EditAnswerComponent,
    BillDetailComponent,
    SuccessComponent,
    OfflineComponent,
  ],
  imports: [
    BrowserModule,
    SecurityModule,
    FormsModule,
    HttpClientModule,
    EmployeeModule,
    AppRoutingModule,
    ClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    CKEditorModule,
    AngularEditorModule,
    HttpClientModule,
    NgxPaginationModule,
    MatSnackBarModule,
    MaterialModule,
    NgxPaginationModule,
    CheckoutModule,
    MatTabsModule
  ],
  exports: [],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    authInterceptorProviders,DatePipe
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
