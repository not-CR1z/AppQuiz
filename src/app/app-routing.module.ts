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
import { UpdateQuizComponent } from './components/update-quiz/update-quiz.component';
import { UpdateQuestionComponent } from './components/update-quiz/update-question/update-question.component';
import { UpdateAvatarComponent } from './components/update-avatar/update-avatar.component';
import { quizGuard } from './helpers/quiz.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate:[quizGuard]},
  {path: 'profile', component: ProfileComponent, canActivate:[quizGuard]},
  {path: 'quiz', component: QuizComponent, canActivate:[quizGuard]},
  {path: 'changePassword', component: ChangePasswordComponent, canActivate:[quizGuard]},
  {path: 'doExam/:quizId', component: ExamPresentationComponent, canActivate:[quizGuard]},
  {path: 'question/:quizId', component: QuestionComponent, canActivate:[quizGuard]},
  {path: 'updateQuiz/:quizId', component: UpdateQuizComponent, canActivate:[quizGuard]},
  {path: 'updateQuestion/:indexQuiz', component: UpdateQuestionComponent, canActivate:[quizGuard]},
  {path: 'updatAvatar/:userId', component: UpdateAvatarComponent, canActivate:[quizGuard]},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: '/dashboard'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
