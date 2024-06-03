import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/start/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/start/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './components/profile/profile.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuestionComponent } from './components/question/question.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AlphabetPipe } from './alphabet.pipe';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { MatDialogModule} from '@angular/material/dialog';
import { ExamPresentationComponent } from './components/exam-presentation/exam-presentation.component';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    ProfileComponent,
    QuizComponent,
    QuestionComponent,
    AlphabetPipe,
    ChangePasswordComponent,
    ExamPresentationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    //AngularMaterial
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
