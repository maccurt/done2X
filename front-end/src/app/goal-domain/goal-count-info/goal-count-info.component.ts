import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MathService } from 'src/app/math.service';

@Component({
  selector: 'app-goal-count-info',
  templateUrl: './goal-count-info.component.html',
  styleUrls: ['./goal-count-info.component.scss']
})
export class GoalCountInfoComponent implements OnInit, OnChanges {
  @Input() completed:number = 0;
  @Input() goalCount:number = 0;
  percentage:number = 0;
  
  constructor(private mathService:MathService) { }  

  ngOnInit(): void {
    this.percentage = this.mathService.getPercent(this.completed,this.goalCount);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.percentage = this.mathService.getPercent(this.completed,this.goalCount);
  }
}