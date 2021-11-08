import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Goal, GoalService } from './goal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'done2X';
  formGroup!: FormGroup;
  goalControl: FormControl = new FormControl();

  goalList: Goal[] = [];

  constructor(private goalService: GoalService) {
  }
}
