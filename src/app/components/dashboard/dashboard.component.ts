import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from 'src/app/quiz.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  constructor(private toast:ToastrService, private quizService: QuizService) {
    
  }
  ngOnInit(): void {
    this.quizService.GetQuizzes().subscribe(data=>{
      this.exams = data;
    })
  }
  exams = [];
  cards = [1,2,3,4,5,6];
}
