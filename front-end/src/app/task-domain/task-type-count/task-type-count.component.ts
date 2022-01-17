import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TaskItem } from '../task-item/task-item.type';
import { countBy,  orderBy,  sortBy } from 'lodash';
import { Code, CodeService } from 'src/app/code.service';
import { MathService } from 'src/app/math.service';

class TaskTypeCount {
  type!: Code;
  count!: number;
  percent!: number;
}

@Component({
  selector: 'd2x-task-type-count',
  templateUrl: './task-type-count.component.html',
  styleUrls: ['./task-type-count.component.scss']
})
export class TaskTypeCountComponent implements OnInit, OnChanges {

  @Input() public list!: TaskItem[];

  taskTypeCountList: TaskTypeCount[] = [];
  constructor(private codeService: CodeService,
    private mathService: MathService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.taskTypeCountList = this.getCountByData(this.list);
  }

  ngOnInit(): void {
    this.taskTypeCountList = this.getCountByData(this.list);
  }

  getCountByData(taskItemList: TaskItem[]): TaskTypeCount[] {
    //TODO Move this to the service if it makes sense
    let taskTypeCountList: TaskTypeCount[] = [];
    // this.taskTypeCountList = [];
    const countByData = countBy(this.list, 'taskTypeId');

    let length = taskItemList.length
    for (const [key, value] of Object.entries(countByData)) {
      console.log(`${key}: ${value}`);
      const code = this.codeService.getTaskType(+key)
      let taskTypeCount: TaskTypeCount = {
        count: value,
        type: code!,
        percent: this.mathService.getPercent(value, length)
      }
      taskTypeCountList.push(taskTypeCount);
    }

    taskTypeCountList = orderBy(taskTypeCountList, ['type.name']);
    return taskTypeCountList
  }

}
