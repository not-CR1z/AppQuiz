import { ChangePassDto, Question, Quiz, Stats, User, UserLogin } from './models/QuizModels';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuizService {
  ApiUrl = "https://localhost:7043/api/User/"

  constructor(private http: HttpClient) {
  }
  tokenn;
  GetTokenDecoded(){
    let token = localStorage.getItem('token');
    this.tokenn = token;
    let decodedToken = jwtDecode(token);
    return JSON.parse(decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata']);
  }
  public Register(user: UserLogin): Observable<any> {
    return this.http.post('https://localhost:7043/api/User/addUser', user);
  }
  public Login(user: UserLogin): Observable<any> {
    return this.http.post('https://localhost:7043/api/User/login', user);
  }

  public GetQuizzes(): Observable<any> {
    return this.http.post('https://localhost:7043/api/Quiz/getQuizzes', '',{headers: {
      authorization: `Bearer ${ this.tokenn }`
    }});
  }

  public GetCategories(): Observable<any> {
    return this.http.post('https://localhost:7043/api/Quiz/getCategories', '');
  }
  public AddQuiz(quiz: Quiz): Observable<any> {
    return this.http.post('https://localhost:7043/api/Quiz/addQuiz', quiz);
  }
  public AddQuestion(question: any): Observable<any> {
    return this.http.post('https://localhost:7043/api/Quiz/addQuestion', question);
  }
  public GetOwnQuizzes(ownerId: number): Observable<any> {
    return this.http.post('https://localhost:7043/api/Quiz/getQuizzesByUser', ownerId);
  }
  public DeleteQuiz(quizId: number): Observable<any> {
    return this.http.post('https://localhost:7043/api/Quiz/deleteQuiz', quizId);
  }
  public ChangePassword(changePassDto: ChangePassDto): Observable<any> {
    return this.http.post('https://localhost:7043/api/User/changePassword', changePassDto);
  }
  public GetQuiz(quizId: number): Observable<any> {
    return this.http.post('https://localhost:7043/api/Quiz/getQuizById', quizId);
  }
  public UpdateQuiz(quiz: Quiz): Observable<any> {
    return this.http.post('https://localhost:7043/api/Quiz/updateQuiz', quiz);
  }
  public UpdateQuestion(question: Question): Observable<any> {
    return this.http.post('https://localhost:7043/api/Quiz/updateQuestion', question);
  }
  public DeleteQuestion(questionId: number): Observable<any> {
    return this.http.post('https://localhost:7043/api/Quiz/deleteQuestion', questionId);
  }
  public GetAvatars(): Observable<any> {
    return this.http.post('https://localhost:7043/api/User/getAvatars', '');
  }
  public UpdateAvatar(user: User): Observable<any> {
    return this.http.post('https://localhost:7043/api/User/updateAvatar', user);
  }
  public PresentQuiz(quizId: number): Observable<any> {
    return this.http.post('https://localhost:7043/api/Quiz/presentQuiz', quizId);
  }
  public AddStars(stats: Stats): Observable<any> {
    return this.http.post('https://localhost:7043/api/Quiz/addStars', stats);
  }
  public quizDto: Quiz;
}
