import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {

  @Output() starSelected = new EventEmitter<number>();
  
  rating: number;
  maxRating = [1,2,3,4,5];

  setRating(rating: number) {
    this.rating = rating;
    this.starSelected.emit(rating);
  }
}
