import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { QuizService } from 'src/app/quiz.service';
import { Answer, Question } from 'src/app/models/QuizModels';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  constructor(private quizService: QuizService, private route: ActivatedRoute, private toastr: ToastrService,private spinner: NgxSpinnerService) {
    route.params.subscribe(p => {
      this.quizId = parseInt(p['quizId']);
      this.question = {
        name: '',
        answers: [{
          name: '',
          isTrue: false
        },{
          name: '',
          isTrue: false
        },{
          name: '',
          isTrue: false
        }],
        quizId: this.quizId
      };
    })
  }
  counter = 1;
  quizId: number;
  CheckBoxStatusChanged(index: number) {
    this.question.answers.forEach(a => a.isTrue = false);
    this.question.answers[index].isTrue ? this.question.answers[index].isTrue = false : this.question.answers[index].isTrue = true;
  }
  question: Question;
  AddQuiz() {
    this.spinner.show()
    this.quizService.AddQuestion(this.question).subscribe(data => {
      this.toastr.success('Pregunta guardada', data.message)
      this.counter++;
      this.question = this.question = {
        name: '',
        answers: [{
          name: '',
          isTrue: false
        }],
        quizId: this.quizId
      };
      this.spinner.hide();
    })
  }
  OptionPush() {
    let answer = {
      name: '',
      isTrue: false
    };
    this.question.answers.push(answer);
  }
}
