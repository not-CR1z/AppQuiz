import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { QuizService } from 'src/app/quiz.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { Router } from '@angular/router';
import { ConfirmDeleteModalComponent } from '../modals/confirm-delete-modal/confirm-delete-modal.component';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
EditQuiz(quizId: number) {
  this.router.navigate(['/updateQuiz/'+ quizId])
}
  avatarImage: string;
  userName: string;
  exams = [];
  userInfo;

  constructor(private router: Router,private quizService: QuizService, private spinner: NgxSpinnerService, private toastr: ToastrService, public dialog: MatDialog) {
    spinner.show();
    this.userInfo = quizService.GetTokenDecoded();
    quizService.GetOwnQuizzes(this.userInfo.Id).subscribe(data =>{
      this.exams = data.quizzes;
    spinner.hide();
    })
    this.avatarImage = this.userInfo.Avatar.Image;
    this.userName = this.userInfo.UserName;
  }
  DeleteQuiz(quiz: number, index:number){
   const dialogRef = this.dialog.open(ConfirmDeleteModalComponent,{
      width: '400px'
    })
    dialogRef.afterClosed().subscribe(data =>{
      if (dialogRef.componentInstance.confirmed) {
        this.spinner.show();
        this.quizService.DeleteQuiz(quiz).subscribe(data => {
          this.toastr.success(data.message, this.exams[index].name + ' removido');
          this.exams.splice(index, 1);
          this.spinner.hide();
        })
      }
    })
  }
  OpenChangePassword(){
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
    });
  }
}
