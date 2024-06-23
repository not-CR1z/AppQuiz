import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Quiz } from 'src/app/models/QuizModels';
import { QuizService } from 'src/app/quiz.service';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent {
  quizId: number;
  quiz: Quiz;
  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
  ) {
    route.params.subscribe(x => this.quizId = parseInt(x['quizId']))
    quizService.GetQuiz(this.quizId).subscribe(data => {
      this.quiz = data;
      quizService.quizDto = data;
    })
  }

  // Guarda los cambios del Quiz efectuados por el usuario
  UpdateQuiz() {
    this.spinner.show();
    this.quizService.UpdateQuiz(this.quiz).subscribe(data => {
      this.toastr.success(data.message, 'Actualización finaliada')
      this.router.navigate(['/profile'])
      this.spinner.hide();
    }), error => {
      this.toastr.error(error.error.message);
      this.spinner.hide();
    }
  }

  // Elimina la pregunta seleccionada por el usuario
  DeleteQuestion(questionId: number, index: number) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '400px',
      data: {
        title: "Eliminar Pregunta",
        description: "Seguro de que deseas eliminar esta pregunta"
      }
    })
    dialogRef.afterClosed().subscribe(data => {
      if (dialogRef.componentInstance.confirmed) {
        this.spinner.show();
        this.quizService.DeleteQuestion(questionId).subscribe(data => {
          this.quiz.questions.splice(index, 1)
          this.toastr.success(data.message, 'Acción ejecutada')
          this.spinner.hide();
        })
      }
    })
  }

  // Lleva al usuario a la ventana de actualización de pregunta 
  EditQuestion(questionIndex: number) {
    this.router.navigate(['/updateQuestion/' + questionIndex])
  }
}
