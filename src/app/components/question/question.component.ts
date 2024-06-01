import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
OptionPush() {
  this.options.push(2)
}
  
  constructor(private _formBuilder: FormBuilder) {
  }

  toppings = this._formBuilder.group({
    pepperoni: false,
    extracheese: false,
    mushroom: false,
  });

  options = [0];
}
