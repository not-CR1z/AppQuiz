import { QuizService } from 'src/app/quiz.service';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz, Stats } from 'src/app/models/QuizModels';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-exam-presentation',
  templateUrl: './exam-presentation.component.html',
  styleUrls: ['./exam-presentation.component.css']
})
export class ExamPresentationComponent {
  getStars(stars: number) {
    this.stars = stars;
  }
  SendStarsAndGoBack() {
    let stats = new Stats;
    stats.quizId = this.quizId;
    stats.starRating = this.stars;
    if (this.stars > 0) {
      this.spinner.show()
      this.quizService.AddStars(stats).subscribe(data => {
        this.toastr.success(data.message)
        this.spinner.hide();
        this.router.navigate([['/dashboard']])
      })
    }
    else {
      this.router.navigate([['/dashboard']])
    }
  }
  selectionList = [];
  quizFinished = false;
  iconsOnFinish = [];
  stars: number;
  //Actualiza la opción selecionada por el usuario en la lista correspondiente
  OptionSelected(questionId: number, answerId: number, name: string) {
    let selectedPair = { "questionId": questionId, "answerId": answerId, "name": name };
    let wasIncluded = this.selectionList.find(x => x.questionId == questionId);
    if (wasIncluded) {
      let indexList = this.selectionList.indexOf(wasIncluded)
      this.selectionList.splice(indexList, 1);
      this.selectionList.push(selectedPair);
      this.correct_options;
    }
    else {
      this.selectionList.push(selectedPair);
    }
  }

  //Método encargado de la finalización del examen
  SendResponses() {
    if (this.selectionList.length == this.correct_options.length) {
      this.quizService.PresentQuiz(this.quizId).subscribe(() => {
        this.quizFinished = true;
        this.correct_options.forEach(c => {
          let ico = "cancel"
          this.selectionList.forEach(s => {
            if (s.questionId == c.questionId && s.name == c.name) {
              ico = "check_circle"
            }
          });
          this.iconsOnFinish.push(ico);
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
    }
    else {
      this.toastr.info('Asegurate de diligenciar el Quiz por completo', 'Faltan preguntas por responder')
    }
  }
  quizId: number;
  quiz: Quiz;
  correct_options = [];
  constructor(private route: ActivatedRoute, private quizService: QuizService, private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router) {
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

