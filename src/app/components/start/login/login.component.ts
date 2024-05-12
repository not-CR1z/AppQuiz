import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: FormGroup;
  constructor(private fb: FormBuilder) {
    this.login = this.fb.group
    ({
      user:['',Validators.required],
      pass:['',Validators.required]
    })
  }
}
