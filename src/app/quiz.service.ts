import { ChangePassDto, Question, Quiz, User, UserLogin } from './models/QuizModels';
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

  public GetCategories(): Observable<any>{
    return this.http.post('https://localhost:7043/api/Quiz/getCategories','');
  }
  public AddQuiz(quiz: Quiz): Observable<any>{
    return this.http.post('https://localhost:7043/api/Quiz/addQuiz',quiz);
  }
  public AddQuestion(question: any): Observable<any>{
    return this.http.post('https://localhost:7043/api/Quiz/addQuestion',question);
  }
  public GetOwnQuizzes(ownerId: number): Observable<any>{
    return this.http.post('https://localhost:7043/api/Quiz/getQuizzesByUser',ownerId);
  }
  public DeleteQuiz(quizId: number): Observable<any>{
    return this.http.post('https://localhost:7043/api/Quiz/deleteQuiz',quizId);
  }
  public ChangePassword(changePassDto: ChangePassDto): Observable<any>{
    return this.http.post('https://localhost:7043/api/App/changePassword',changePassDto);
  }
  public DoQuiz(quizId: number): Observable<any>{
    return this.http.post('https://localhost:7043/api/Quiz/doQuiz',quizId);
  }
  public UserInfo;
}
