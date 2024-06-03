import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from 'src/app/quiz.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName: string;
avt: any;
  constructor(private toast: ToastrService, private quizService: QuizService, private spinner: NgxSpinnerService) {

  }
  ngOnInit(): void {
    this.spinner.show();
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.userName = userInfo.userName;
    this.quizService.GetQuizzes().subscribe(data => {
      this.exams = data;
    this.spinner.hide();
    })
  }
  exams = [];
}
