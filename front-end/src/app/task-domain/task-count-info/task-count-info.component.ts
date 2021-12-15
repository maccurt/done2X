import { Component, Input, OnInit } from '@angular/core';
import { MathService } from 'src/app/math.service';

@Component({
  selector: 'app-task-count-info',
  templateUrl: './task-count-info.component.html',
  styleUrls: ['./task-count-info.component.scss']
})
export class TaskCountInfoComponent implements OnInit {
  @Input() taskCompletedCount!: number;
  @Input() taskCount!: number;

  percentage: number = 0;

  constructor(private mathService: MathService) { }

  ngOnInit(): void {
    this.percentage = this.mathService.getPercent(this.taskCompletedCount,this.taskCount);
  } 

}