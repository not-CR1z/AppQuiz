import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Quiz } from 'src/app/models/QuizModels';
import { QuizService } from 'src/app/quiz.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { Router } from '@angular/router';

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

  constructor(private router: Router,private quizService: QuizService, private spinner: NgxSpinnerService, private toastr: ToastrService, public dialog: MatDialog) {
    spinner.show();
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    quizService.GetOwnQuizzes(userInfo.id).subscribe(data =>{
      this.exams = data.quizzes;
    spinner.hide();
    })
    this.avatarImage = userInfo.avatar.image;
    this.userName = userInfo.userName;
  }
  DeleteQuiz(quiz: number, index:number){
    this.spinner.show();
    this.quizService.DeleteQuiz(quiz).subscribe(data =>{
      this.toastr.success(data.message, this.exams[index].name + ' removido');
      this.exams.splice(index, 1);
    this.spinner.hide();
      var x = data;
    })
  }
  OpenDialog(){
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  animal: string;
  name: string;
}
