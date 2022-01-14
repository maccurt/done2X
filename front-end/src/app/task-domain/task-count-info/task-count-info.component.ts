import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MathService } from 'src/app/math.service';

@Component({
  selector: 'd2x-task-count-info',
  templateUrl: './task-count-info.component.html',
  styleUrls: ['./task-count-info.component.scss']
})
export class TaskCountInfoComponent implements OnInit, OnChanges {
  @Input() taskCompletedCount!: number;
  @Input() taskCount!: number;

  percentage: number = 0;

  constructor(private mathService: MathService) { }

  ngOnInit(): void {
    this.calculatePercent()
    //this.percentage = this.mathService.getPercent(this.taskCompletedCount,this.taskCount);
  } 

  ngOnChanges(changes: SimpleChanges): void {
    this.calculatePercent()
  }

  calculatePercent(){
    this.percentage = this.mathService.getPercent(this.taskCompletedCount,this.taskCount);
  }
}
