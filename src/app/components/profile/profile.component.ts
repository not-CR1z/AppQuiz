import { Component } from '@angular/core';
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

  constructor(private quizService: QuizService) {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    quizService.GetOwnQuizzes(userInfo.id).subscribe(data =>{
      this.exams = data.quizzes;
    })
    this.avatarImage = userInfo.avatar.image;
    this.userName = userInfo.userName;
  }

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting. `;
}
