import { User } from './models/User';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrl } from './Environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  ApiUrl = "User"

  constructor(private http: HttpClient) { }

  public RegisterUserService(user: User) {
    let endPoint = AppUrl + this.ApiUrl;
    this.http.post('http://localhost:5289/api/User', '');
  }
}
