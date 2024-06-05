import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Quiz } from 'src/app/models/QuizModels';
import { QuizService } from 'src/app/quiz.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent {
UpdateQuiz() {
  this.spinner.show();
  this.quizService.UpdateQuiz(this.quiz).subscribe(data=>{
    this.toastr.success(data.message,'Actualización finaliada')
  })
}
DeleteQuestion(questionId: number, index:number) {
  this.spinner.show();
  this.quizService.DeleteQuestion(questionId).subscribe(data =>{
    this.quiz.questions.splice(index,1)
    this.toastr.success(data.message,'Acción ejecutada')
    this.spinner.hide();
  })
}
  quizId: number;
  quiz: Quiz;
  constructor(private quizService: QuizService, private route: ActivatedRoute, private router: Router, private toastr:ToastrService, private spinner:NgxSpinnerService) {
    route.params.subscribe(x => this.quizId = parseInt(x['quizId']))
    quizService.GetQuiz(this.quizId).subscribe(data => {
      this.quiz = data;
      quizService.quizDto = data;
    })
  }
  EditQuestion(questionIndex: number) {
    this.router.navigate(['/updateQuestion/' + questionIndex])
  }
}
