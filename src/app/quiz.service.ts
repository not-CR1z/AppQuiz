import { User, UserLogin } from './models/QuizModels';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuizService {
  ApiUrl = "https://localhost:7043/api/App/"

  constructor(private http: HttpClient) { }

  public RegisterUserService(user: UserLogin) {

    this.http.post(this.ApiUrl + 'addUser', '');
  }
  public Login(user: UserLogin): Observable<any> {
    return this.http.post('https://localhost:7043/api/App/login', user);
  }

  public GetQuizzes(): Observable<any>{
    return this.http.post('https://localhost:7043/api/Quiz/getQuizzes','');
  }

  public user: User;
}
