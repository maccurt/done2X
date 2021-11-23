import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskItemStatus } from '../task-item.service';
import { TaskItem } from './task-item.type';
import { faTrashAlt, faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';

export enum TypeAction {
  add = 1,
  edit,
  delete,
  moveStatus
}

export class TypeClickEvent<Type> {
  constructor(public action: TypeAction, public item: Type, public status: TaskItemStatus = TaskItemStatus.unknown) {

  }
}

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {

  //icons
  deleteIcon = faTrashAlt;
  moveLeft = faArrowAltCircleLeft;
  moveRight = faArrowAltCircleRight;

  //input & output
  @Input()
  taskItem!: TaskItem;
  @Output()
  actionEvent = new EventEmitter<TypeClickEvent<TaskItem>>();
  @Output()
  deleteClicked = new EventEmitter<TaskItem>();



  constructor() { }

  taskItemClick(): void {
    this.actionEvent.emit(new TypeClickEvent<TaskItem>(TypeAction.edit, this.taskItem));
  }

  delete(): void {
    this.actionEvent.emit(new TypeClickEvent<TaskItem>(TypeAction.delete, this.taskItem));
  }

  public moveToBacklog(): void {
    this.actionEvent.emit(new TypeClickEvent<TaskItem>(TypeAction.moveStatus, this.taskItem, TaskItemStatus.backLog));
  }
  public moveToCompleted(): void {
    this.actionEvent.emit(new TypeClickEvent<TaskItem>(TypeAction.moveStatus, this.taskItem, TaskItemStatus.completed));
  }

  public moveToInProgress(): void {
    this.actionEvent.emit(new TypeClickEvent<TaskItem>(TypeAction.moveStatus, this.taskItem, TaskItemStatus.inProgress));
  }
}
