import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { QuizService } from 'src/app/quiz.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  register: FormGroup;

  constructor(private fb: FormBuilder, private quizService: QuizService, private http:HttpClient) {
    this.register = this.fb.group
      ({
        user: ['', [Validators.required, Validators.minLength(4)]],
        pass: ['', [Validators.required, Validators.minLength(4)]],
        confirm_pass: ['']
      }, { validator: this.checkPassword })
  }

  checkPassword(group: FormGroup): any {
    const pass = group.controls['pass'].value;
    const confirmPass = group.controls['confirm_pass'].value;
    return pass === confirmPass ? null : { notSame: true };
  }

  async Send() {
    let user = new User();
    user.userName = this.register.get('user').value;
    user.password = this.register.get('pass').value;
    await this.http.post('https://localhost:7043/api/User',{
      "userName":"xyza",
      "password":"456"
  }).subscribe(data =>{
      console.log(data);
      
    })
    // this.quizService.RegisterUserService(user);
  }
}
