import { Component } from '@angular/core';
import { QuizService } from 'src/app/quiz.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private quizService: QuizService) {
    // this.avatarImage = quizService.user.avatar.image;
  }
  avatarImage: string;
  cards = [1,2,3,4,5,6];

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting. `;
}
