import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Quiz } from 'src/app/models/QuizModels';
import { QuizService } from 'src/app/quiz.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  avatarImage: string;
  userName: string;
  exams = [];

  constructor(private quizService: QuizService, private spinner: NgxSpinnerService, private toastr: ToastrService) {
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
}
