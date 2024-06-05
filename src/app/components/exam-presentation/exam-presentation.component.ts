import { QuizService } from 'src/app/quiz.service';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/app/models/QuizModels';

@Component({
  selector: 'app-exam-presentation',
  templateUrl: './exam-presentation.component.html',
  styleUrls: ['./exam-presentation.component.css']
})
export class ExamPresentationComponent {
  selectionList = [];
  quizFinished = false;
  iconsOnFinish = [];
  OptionSelected(questionId: number, answerId: number, name: string) {
    let selectedPair = { "questionId": questionId, "answerId": answerId, "name": name };
    let wasIncluded = this.selectionList.find(x => x.questionId == questionId);
    if (wasIncluded) {
      let indexList = this.selectionList.indexOf(selectedPair);
      this.selectionList.splice(indexList, 1);
      this.selectionList.push(selectedPair);
      this.correct_options;
    }
    else {
      this.selectionList.push(selectedPair);
    }
  }
  SendResponses() {
    this.quizFinished = true;
    let i = 0;
    this.correct_options.forEach(x => {
      let ico = "cancel"
      if (x.id == this.selectionList[i].answerId) {
        ico = "check_circle"
      }
      this.iconsOnFinish.push(ico);
      i++
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  quizId: number;
  quiz: Quiz;
  correct_options = [];
  constructor(private route: ActivatedRoute, private quizService: QuizService, private spinner: NgxSpinnerService) {
    spinner.show();
    route.params.subscribe(p => {
      this.quizId = parseInt(p['quizId']);
    })
    quizService.GetQuiz(this.quizId).subscribe(data => {
      this.quiz = data;
      this.quiz.questions.forEach(a => {
        this.correct_options.push(a.answers.find(x => x.isTrue));
      });
      spinner.hide();
    })
  }
}

