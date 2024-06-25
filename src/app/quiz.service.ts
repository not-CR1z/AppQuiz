import { ChangePassDto, Question, Quiz, Stats, User, UserLogin } from './models/QuizModels';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuizService {
  ApiUrl ="https://quizapp.somee.com/api/"
  public quizDto: Quiz;

  constructor(private http: HttpClient) {
  }
  GetTokenDecoded(){
    let token = localStorage.getItem('token');
    let decodedToken = jwtDecode(token);
    return JSON.parse(decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata']);
  }
  public Register(user: UserLogin): Observable<any> {
    return this.http.post(this.ApiUrl+'User/addUser', user);
  }
  public Login(user: UserLogin): Observable<any> {
    return this.http.post(this.ApiUrl+'User/login', user);
  }

  public GetQuizzes(): Observable<any> {
    return this.http.post(this.ApiUrl+'Quiz/getQuizzes', '');
  }

  public GetCategories(): Observable<any> {
    return this.http.post(this.ApiUrl+'Quiz/getCategories', '');
  }
  public AddQuiz(quiz: Quiz): Observable<any> {
    return this.http.post(this.ApiUrl+'Quiz/addQuiz', quiz);
  }
  public AddQuestion(question: any): Observable<any> {
    return this.http.post(this.ApiUrl+'Quiz/addQuestion', question);
  }
  public GetOwnQuizzes(ownerId: number): Observable<any> {
    return this.http.post(this.ApiUrl+'Quiz/getQuizzesByUser', ownerId);
  }
  public DeleteQuiz(quizId: number): Observable<any> {
    return this.http.post(this.ApiUrl+'Quiz/deleteQuiz', quizId);
  }
  public ChangePassword(changePassDto: ChangePassDto): Observable<any> {
    return this.http.post(this.ApiUrl+'User/changePassword', changePassDto);
  }
  public GetQuiz(quizId: number): Observable<any> {
    return this.http.post(this.ApiUrl+'Quiz/getQuizById', quizId);
  }
  public UpdateQuiz(quiz: Quiz): Observable<any> {
    return this.http.post(this.ApiUrl+'Quiz/updateQuiz', quiz);
  }
  public UpdateQuestion(question: Question): Observable<any> {
    return this.http.post(this.ApiUrl+'Quiz/updateQuestion', question);
  }
  public DeleteQuestion(questionId: number): Observable<any> {
    return this.http.post(this.ApiUrl+'Quiz/deleteQuestion', questionId);
  }
  public GetAvatars(): Observable<any> {
    return this.http.post(this.ApiUrl+'User/getAvatars', '');
  }
  public UpdateAvatar(user: User): Observable<any> {
    return this.http.post(this.ApiUrl+'User/updateAvatar', user);
  }
  public PresentQuiz(quizId: number): Observable<any> {
    return this.http.post(this.ApiUrl+'Quiz/presentQuiz', quizId);
  }
  public AddStars(stats: Stats): Observable<any> {
    return this.http.post(this.ApiUrl+'Quiz/addStars', stats);
  }
}
