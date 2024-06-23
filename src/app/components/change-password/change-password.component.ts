import { ChangePassDto } from '../../models/QuizModels';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from 'src/app/quiz.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  formPass: FormGroup;
  userInfo: any;

  constructor
    (
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<ChangePasswordComponent>,
      private quizService: QuizService,
      private toastr: ToastrService,
      private spinner: NgxSpinnerService
    ) {
    this.formPass = this.fb.group
      ({
        currentPass: ['', [Validators.required, Validators.minLength(4)]],
        newPass: ['', [Validators.required, Validators.minLength(4)]],
        confirm_newPass: ['']
      }, { validator: this.CheckPassword })
  }

  // Valida que las passwords coincidan
  CheckPassword(group: FormGroup): any {
    const pass = group.controls['newPass'].value;
    const confirmPass = group.controls['confirm_newPass'].value;
    return pass === confirmPass ? null : { notSame: true };
  }

  // Aplica el cambio de contraseña
  Ok() {
    this.spinner.show();
    this.userInfo = this.quizService.GetTokenDecoded();
    let changePassDto: ChangePassDto = {
      userId: this.userInfo.Id,
      currentPassword: this.formPass.get('currentPass').value,
      newPassword: this.formPass.get('newPass').value
    }
    this.quizService.ChangePassword(changePassDto).subscribe(data => {
      this.toastr.success(data.message, "Acción finalizada")
      this.spinner.hide();
    }, error => {
      this.toastr.error(error.error.message, "Contraseña incorrecta")
      this.spinner.hide();
    })
  }
}
