import { Component } from '@angular/core';
import { QuizService } from 'src/app/quiz.service';
import { Question } from 'src/app/models/QuizModels';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  counter = 1;
  quizId: number;
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
      this.quizId = parseInt(p['quizId']);
      this.question = {
        name: '',
        answers: [{ name: '', isTrue: false }, { name: '', isTrue: false }, { name: '', isTrue: false }],
        quizId: this.quizId
      };
    })
  }

  // Quita la opción seleccionada de la lista de respuestas
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

  // Guarda la pregunta
  AddQuestion() {
    let fieldsIncompletes = this.question.answers.find(x => x.name == '')
    if (!fieldsIncompletes && this.question.name != '') {
      if (this.optionSelected) {
        this.spinner.show()
        this.quizService.AddQuestion(this.question).subscribe(data => {
          this.toastr.success('Pregunta guardada', data.message)
          this.counter++;
          this.question.name = '';
          this.question.answers.forEach(x => { x.name = ''; });
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

  // Devuelve al usuario a la ventana de agregar Quiz
  GoBack() {
    this.location.back();
  }
}
