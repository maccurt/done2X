import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { TaskItem } from '../task-item/task-item.type';
import { countBy, difference, map, orderBy, sortBy } from 'lodash';
import { Code, CodeService } from 'src/app/code.service';
import { MathService } from 'src/app/math.service';
import { TaskTypeCount } from './task-type-count.type';
import { Goal } from 'src/app/goal-domain/goal.type';
import { IconColorService } from 'src/app/iconColor.service';
import { ModalService } from 'src/app/modal.service';
import { TaskItemService } from '../task-item.service';
import { Subscription } from 'rxjs';
import { TaskEvent } from '../task-item/TypeClickEvent';
import { TaskEvenType } from '../task-item/TypeAction';

@Component({
  selector: 'd2x-task-type-count',
  templateUrl: './task-type-count.component.html',
  styleUrls: ['./task-type-count.component.scss']
})
export class TaskTypeCountComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public list!: TaskItem[];
  @Input() public goal!: Goal;
  @Output() public actionEvent: EventEmitter<TaskEvent> = new EventEmitter();

  private firstCall: boolean = true;
  taskTypeCountList: TaskTypeCount[] = [];
  afterClosedSub$!: Subscription;
  addTaskItemSub$!: Subscription;
  taskTypeList: Code[] = [];

  constructor(private codeService: CodeService,
    private taskItemService: TaskItemService,
    private mathService: MathService,
    public iconColorService: IconColorService,
    private modalService: ModalService) { }

  ngOnInit(): void {

    this.codeService.GetTaskTypeList().subscribe(codes => {
      this.taskTypeList = codes;
      this.taskTypeCountList = this.getCountByData(this.list);
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.firstCall) {
      this.taskTypeCountList = this.getCountByData(this.list);
    }
    this.firstCall = false;
  }

  //TODO this code is duplicatesd is there a way to make it a service,component, etc.
  public addTask(taskTypeCode: Code) {

    const taskItem = new TaskItem();
    taskItem.taskTypeCode = taskTypeCode;
    taskItem.taskTypeId = taskTypeCode.id;
    taskItem.goalId = this.goal.id;

    this.afterClosedSub$ = this.modalService.taskItemModal(taskItem).
      afterClosed().subscribe((taskItem: TaskItem) => {
        if (taskItem) {
          this.addTaskItemSub$ = this.taskItemService.addTaskItem(taskItem).subscribe((response) => {
            this.actionEvent.emit(new TaskEvent(TaskEvenType.add, response));
          });
        }
      });
  }

    //TODO Move this to the service if it makes sense
  getCountByData(taskItemList: TaskItem[]): TaskTypeCount[] {
  
    let taskTypeCountList: TaskTypeCount[] = [];
    let length = taskItemList.length;
    const countByData = countBy(this.list, 'taskTypeId');
    const entries = Object.entries(countByData);
    
    this.taskTypeList.forEach(taskType => {
      const entry = entries.find(e => {
        return +e[0] === taskType.id;
      });

      const taskCount: TaskTypeCount = entry ?
        { count: entry[1], type: taskType, percent: this.mathService.getPercent(entry[1], length) } :
        { count: 0, type: taskType, percent: 0 };
      taskTypeCountList.push(taskCount);

    });

    taskTypeCountList = orderBy(taskTypeCountList, ['type.name']);
    return taskTypeCountList;
  }
  
  ngOnDestroy(): void {
    this.afterClosedSub$?.unsubscribe();
    this.addTaskItemSub$?.unsubscribe();
  }

}
