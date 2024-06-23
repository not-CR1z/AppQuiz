import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Question } from 'src/app/models/QuizModels';
import { QuizService } from 'src/app/quiz.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent {
  counter = 1;
  indexQuiz: number;
  question: Question;
  optionSelected = false;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private location: Location
  ) {
    route.params.subscribe(p => {
      this.indexQuiz = parseInt(p['indexQuiz']);
      this.question = quizService.quizDto.questions[this.indexQuiz];
    })
  }
  // Elimina la pregunta seleccionada
  DropOption(i: number) {
    if (this.question.answers.length > 2) {
      this.question.answers.splice(i, 1);
    }
    else {
      this.toastr.info('Deben haber dos opciones de respuesta por lo menos')
    }
  }

  // Actualiza el checkbox con la opción correcta
  CheckBoxStatusChanged(index: number) {
    this.question.answers.forEach(a => a.isTrue = false);
    this.question.answers[index].isTrue ? this.question.answers[index].isTrue = false : this.question.answers[index].isTrue = true;
    this.optionSelected = true;
  }

  // Guarda los cambios realizados por el usuario
  UpdateQuestion() {
    let fieldsIncompletes = this.question.answers.find(x => x.name == '')
    if (!fieldsIncompletes && this.question.name != '') {
      if (this.optionSelected) {
        this.spinner.show()
        this.quizService.UpdateQuestion(this.question).subscribe(data => {
          this.toastr.success('Pregunta guardada', data.message)
          this.counter++;
          this.question.name = '';
          this.question.answers.forEach(x => { x.name = ''; });
          this.location.back();
          this.spinner.hide();
        })
      }
      else {
        this.toastr.info('Marque la opción correcta')
      }
    }
    else {
      this.toastr.info('Asegurate no dejar campos vacíos')
    }
  }

    // Agrega una nueva opción a la lista de respuestas
  OptionPush() {
    let answer = {
      name: '',
      isTrue: false
    };
    this.question.answers.push(answer);
  }
  GoBack() {
    this.location.back();
  }
}
