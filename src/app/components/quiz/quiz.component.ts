import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  quiz: FormGroup;
  constructor(fb: FormBuilder, private router: Router) {
   
  }
  SendQuiz() {
    this.router.navigate(['/question']);
  }
}
