import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Category, Quiz } from 'src/app/models/QuizModels';
import { QuizService } from 'src/app/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  quiz: FormGroup;
  hola = [1,2,3]
  categories: Category[];
  constructor(fb: FormBuilder, private router: Router, private quizService: QuizService, private toastr:ToastrService, private spinner: NgxSpinnerService) {
   quizService.GetCategories().subscribe(data => {
    var x = data;
     this.categories = data;
  }) 
    this.quiz = fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
    })
  }
  SendQuiz() {
    this.spinner.show();
    let quiz : Quiz = {
      name: this.quiz.get('title').value,
      categoryId: this.quiz.get('category').value,
      description: this.quiz.get('description').value,
      creatorId: 1
    }
    this.quizService.AddQuiz(quiz).subscribe(data =>{
      this.toastr.success(`Quiz ${quiz.name} sa ha agregado a tu perfil`,data.message)
      this.router.navigate(['/question/' + data.quizId])
      this.spinner.hide();
    })
  }
}
