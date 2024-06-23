import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserLogin } from 'src/app/models/QuizModels';
import { QuizService } from 'src/app/quiz.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  register: FormGroup;

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.register = this.fb.group
      ({
        user: ['', [Validators.required, Validators.minLength(4)]],
        pass: ['', [Validators.required, Validators.minLength(4)]],
        confirm_pass: ['']
      }, { validator: this.checkPassword })
  }

  // Valida que las passwords coincidan
  checkPassword(group: FormGroup): any {
    const pass = group.controls['pass'].value;
    const confirmPass = group.controls['confirm_pass'].value;
    return pass === confirmPass ? null : { notSame: true };
  }

  // Envía la información ingresada por el usuario
  async Send() {
    this.spinner.show();
    let user = new UserLogin();
    user.userName = this.register.get('user').value;
    user.password = this.register.get('pass').value;
    this.quizService.Register(user).subscribe(data => {
      this.toastr.success(data.message, 'Ahora puedes ingresar con tu usuario')
      this.spinner.hide();
      this.router.navigate(['/login']);
    }), error => {
      this.toastr.error(error.error.message, 'Prueba con un usuario diferente')
      this.spinner.hide();
    }
  }
}
