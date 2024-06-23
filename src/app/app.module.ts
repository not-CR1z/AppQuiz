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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './components/profile/profile.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuestionComponent } from './components/question/question.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AlphabetPipe } from './helpers/alphabet.pipe';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { MatDialogModule} from '@angular/material/dialog';
import { ExamPresentationComponent } from './components/exam-presentation/exam-presentation.component';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { UpdateQuizComponent } from './components/update-quiz/update-quiz.component';
import { UpdateQuestionComponent } from './components/update-quiz/update-question/update-question.component';
import { ConfirmDeleteModalComponent } from './components/modals/confirm-delete-modal/confirm-delete-modal.component';
import { UpdateAvatarComponent } from './components/update-avatar/update-avatar.component';
import { StarRatingComponent } from './components/exam-presentation/star-rating/star-rating.component';
import { AddTokenInterceptor } from './helpers/add-token.interceptor';


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
    ExamPresentationComponent,
    UpdateQuizComponent,
    UpdateQuestionComponent,
    ConfirmDeleteModalComponent,
    UpdateAvatarComponent,
    StarRatingComponent
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
  providers: [{provide: HTTP_INTERCEPTORS, useClass:AddTokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
