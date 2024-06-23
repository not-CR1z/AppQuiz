import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { QuizService } from 'src/app/quiz.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  avatarImage: string;
  userName: string;
  exams = [];
  userInfo;

  constructor(
    private router: Router,
    private quizService: QuizService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
    spinner.show();
    this.userInfo = quizService.GetTokenDecoded();
    quizService.GetOwnQuizzes(this.userInfo.Id).subscribe(data => {
      this.exams = data.quizzes;
      spinner.hide();
    })
    this.avatarImage = this.userInfo.Avatar.Image;
    this.userName = this.userInfo.UserName;
  }
  
  // Lleva al usuario a la pantalla de edición de quiz
  EditQuiz(quizId: number) {
    this.router.navigate(['/updateQuiz/' + quizId])
  }

  // Muestra el diálogo de eliminación previo a la eliminación de un quiz 
  DeleteQuiz(quiz: number, index: number) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '400px',
      data: {
        title: "Eliminar Quiz",
        description: "Seguro de que deseas eliminar este Quiz"
      }
    })
    dialogRef.afterClosed().subscribe(data => {
      if (dialogRef.componentInstance.confirmed) {
        this.spinner.show();
        this.quizService.DeleteQuiz(quiz).subscribe(data => {
          this.toastr.success(data.message, this.exams[index].name + ' removido');
          this.exams.splice(index, 1);
          this.spinner.hide();
        })
      }
    })
  }

  // Abre el dialogo de actualización de contraseña 
  OpenChangePassword() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
    });
  }
}
