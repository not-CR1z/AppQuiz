import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Avatar, User } from 'src/app/models/QuizModels';
import { QuizService } from 'src/app/quiz.service';

@Component({
  selector: 'app-update-avatar',
  templateUrl: './update-avatar.component.html',
  styleUrls: ['./update-avatar.component.css']
})
export class UpdateAvatarComponent {
  userInfo: any;
  avatarList: Avatar[];
  avatarSelected: Avatar;
  constructor(private route: ActivatedRoute, private quizService: QuizService, private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router) {
    spinner.show();
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    quizService.GetAvatars().subscribe(data => {
      this.avatarList = data;
      spinner.hide();
    })
  }
  async GoBackAndUpdate() {
    this.spinner.show();
    if (this.avatarSelected != undefined) {
      let user: User = {
        id: this.userInfo.id,
        avatarId: this.avatarSelected.id,
        userName: 'x',
        password: 'x',
        avatar: this.avatarSelected
      }
      await this.quizService.UpdateAvatar(user).subscribe(data => {
        console.log(data);
        this.userInfo.avatar = this.avatarSelected;
        localStorage.setItem("userInfo",JSON.stringify(this.userInfo));
        this.toastr.success(data.message, 'Actualización exitosa');
        this.router.navigate(['/profile']);
        this.spinner.hide();
      }, error => {
        this.toastr.error(error.error.message);
        this.spinner.hide();
      }
    )
    }
    else{
      this.router.navigate(['/profile']);
    }
  }
  UserSelect(avatar: Avatar) {
    this.avatarSelected = avatar;
  }
  UpdateAvatar() {
    let user = new User();
    user.id = this.userInfo.id;
  }

}
