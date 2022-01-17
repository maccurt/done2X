import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconColorService } from 'src/app/iconColor.service';
import { TaskItemStatus } from '../task-item.service';
import { TaskItem } from './task-item.type';
import { TaskEvenType } from './TypeAction';
import { TaskEvent } from './TypeClickEvent';

@Component({
  selector: 'd2x-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  //input & output
  @Input()
  taskItem!: TaskItem;
  @Output()
  actionEvent = new EventEmitter<TaskEvent>();
  @Output()
  deleteClicked = new EventEmitter<TaskItem>();

  constructor(public iconColorService:IconColorService) { }

  taskItemClick(): void {
    this.actionEvent.emit(new TaskEvent(TaskEvenType.edit, this.taskItem));
  }

  delete(): void {
    this.actionEvent.emit(new TaskEvent(TaskEvenType.delete, this.taskItem));
  }

  public moveToBacklog(): void {
    this.actionEvent.emit(new TaskEvent(TaskEvenType.moveStatus, this.taskItem, TaskItemStatus.backLog));
  }
  public moveToCompleted(): void {
    this.actionEvent.emit(new TaskEvent(TaskEvenType.moveStatus, this.taskItem, TaskItemStatus.completed));
  }

  public moveToInProgress(): void {
    this.actionEvent.emit(new TaskEvent(TaskEvenType.moveStatus, this.taskItem, TaskItemStatus.inProgress));
  }
}
