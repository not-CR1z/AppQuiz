import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { QuizService } from 'src/app/quiz.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  userName: string;
  avt: any;
  avgStars = [];
  exams = [];
  constructor( private quizService: QuizService, private spinner: NgxSpinnerService, private cookie: CookieService) {
    this.spinner.show();
    let userInfo = quizService.GetTokenDecoded();
    this.userName = userInfo.UserName;
    this.quizService.GetQuizzes().subscribe(data => {
      this.exams = data;
      this.exams.forEach(x => {
        let acc = 0;
        x.stats.forEach(y => {
          acc += y.starRating;
        });
        this.avgStars.push(acc/x.stats.length);
      });
      this.spinner.hide();
    })
  }
}