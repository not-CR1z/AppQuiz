import { QuizService } from 'src/app/quiz.service';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/models/QuizModels';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private quizService: QuizService, private toastr: ToastrService) {
    this.login = this.fb.group
      ({
        userName: ['', Validators.required],
        password: ['', Validators.required]
      })
  }
  Submit() {
    let user: UserLogin = this.login.value;
    this.quizService.Login(user).subscribe(data => {
      this.router.navigate(['/dashboard'])
    },
      error => {
        this.toastr.error(error.error.message, "Error")
      }
    )
  }
}
