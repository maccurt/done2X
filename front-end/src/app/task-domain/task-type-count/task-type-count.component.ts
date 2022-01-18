import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { TaskItem } from '../task-item/task-item.type';
import { countBy, orderBy, sortBy } from 'lodash';
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
  constructor(private codeService: CodeService,
    private taskItemService: TaskItemService,
    private mathService: MathService,
    public iconColorService: IconColorService,
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.taskTypeCountList = this.getCountByData(this.list);
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
            //TODO remove this if we are not going to use the completed property            
            this.actionEvent.emit(new TaskEvent(TaskEvenType.add, response));
          });
        }
      });
  }

  getCountByData(taskItemList: TaskItem[]): TaskTypeCount[] {
    //TODO Move this to the service if it makes sense
    let taskTypeCountList: TaskTypeCount[] = [];
    // this.taskTypeCountList = [];
    const countByData = countBy(this.list, 'taskTypeId');

    let length = taskItemList.length;
    for (const [key, value] of Object.entries(countByData)) {
      const code = this.codeService.getTaskType(+key);
      let taskTypeCount: TaskTypeCount = {
        count: value,
        type: code!,
        percent: this.mathService.getPercent(value, length)
      };
      taskTypeCountList.push(taskTypeCount);
    }

    taskTypeCountList = orderBy(taskTypeCountList, ['type.name']);
    return taskTypeCountList;
  }

  ngOnDestroy(): void {
    this.afterClosedSub$?.unsubscribe();
    this.addTaskItemSub$?.unsubscribe();
  }

}
