import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/start/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/start/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuestionComponent } from './components/question/question.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ExamPresentationComponent } from './components/exam-presentation/exam-presentation.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'quiz', component: QuizComponent},
  {path: 'changePassword', component: ChangePasswordComponent},
  {path: 'doExam', component: ExamPresentationComponent},
  {path: 'question/:quizId', component: QuestionComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: '/dashboard'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
