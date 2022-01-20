import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, Type } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { orderBy } from 'lodash';
import { Subscription } from 'rxjs';
import { Code, CodeService } from 'src/app/code.service';
import { GoalService } from 'src/app/goal-domain/goal.service';
import { Goal } from 'src/app/goal-domain/goal.type';
import { IconColorService } from 'src/app/iconColor.service';
import { ModalService } from 'src/app/modal.service';
import { TaskItemService, TaskItemStatus } from '../task-item.service';
import { TaskItem } from '../task-item/task-item.type';
import { TaskEvenType } from '../task-item/TypeAction';
import { TaskEvent } from '../task-item/TypeClickEvent';

export class Column {
  property!: string;
  name!: string;
  isAscending?: boolean = true;
  isCurrentSort?: boolean;
}

@Component({
  selector: 'd2x-task-item-list-v2',
  templateUrl: './task-item-list-v2.component.html',
  styleUrls: ['./task-item-list-v2.component.scss']
})
export class TaskItemListV2Component implements OnInit, OnDestroy {
  @Input() completedMode: boolean = false;
  @Input() taskItemList: TaskItem[] = [];
  @Input() goal!: Goal;
  @Output() actionEvent = new EventEmitter<TaskEvent>();

  allTaskSelected: boolean = false;
  propertyToSort: string = 'priority';
  columns: Column[] = [{ name: 'Name', property: 'name' }, { name: 'Priority', property: 'priority' }];
  //subscription
  afterClosedSub$!: Subscription;
  addTaskItemSub$!: Subscription;
  deleteAfterClosedSub$!: Subscription;
  updateTaskItemSub$!: Subscription;
  goalList: Goal[] = [];
  isMobile!: boolean;
  getGoalSub$!: Subscription;
  paramsSub$!: Subscription;
  taskTypeList: Code[] = [];
  taskItemToMove?: TaskItem;

  constructor(
    private taskItemService: TaskItemService,
    public iconColorService: IconColorService,
    private goalService: GoalService,
    private modalService: ModalService,
    private snackbar: MatSnackBar,
    private codeService: CodeService,
  ) { }

  ngOnInit(): void {

    this.codeService.GetTaskTypeList().subscribe((codes) => {
      this.taskTypeList = codes;
    });

    this.getGoalSub$ = this.goalService.GetGoalList(this.goal.projectId).subscribe((goalList) => {
      this.goalList = goalList.filter((g) => {
        return !g.isCompleted && g.id !== this.goal.id;
      });
      this.goalList = this.goalList.splice(0, 10);
      this.goalList = orderBy(this.goalList, ['targetCompletionDate']);
    });
  }

  isATaskSelected(): boolean {
    return this.taskItemList.findIndex((t) => { return t.selected; }) > -1;
  }

  selectTask(taskItem: TaskItem, checked: boolean) {
    taskItem.selected = checked;
    if (!checked) {
      this.allTaskSelected = false;
    }
  }

  selectAllClick(checked: boolean) {
    this.taskItemList.forEach((t) => {
      t.selected = checked;
    });
  }

  removeTaskToMove() {
    this.taskItemToMove = undefined;
  }
  setTaskToMove(taskItem: TaskItem) {
    this.taskItemToMove = taskItem;    
  }
  
  moveSelectedTaskToGoal(goal: Goal) {

    if (this.taskItemToMove) {
      const taskItemList: TaskItem[] = [];
      taskItemList.push(this.taskItemToMove);
      this.moveTask(goal, taskItemList);
      this.taskItemToMove = undefined;
    }
    else{
      this.moveTask(goal, this.taskItemList.filter((t) => { return t.selected; }));
    }    
  }

  moveTask(goal: Goal, taskItemList: TaskItem[]) {    
    this.modalService.moveTaskModal(taskItemList, goal.name).afterClosed().subscribe((yesMove) => {
      if (yesMove) {
        this.taskItemService.moveTaskItemListToGoal(taskItemList, goal.id).subscribe(() => {
          taskItemList.forEach((t) => {
            this.taskItemService.removeTaskFromList(t, this.taskItemList);
          });
          //TODO we are passing the first item in the list and that is not correct
          //re think this typeclick event make it specific to task with no generic
          const event = new TaskEvent(TaskEvenType.moveTaskItemListToGoal, taskItemList[0]);
          this.actionEvent.emit(event);
        });
      }
    });
  }

  priorityToggle(change: MatButtonToggleChange, taskItem: TaskItem) {
    //TODO is there a way to bind to the value and not need this method    
    taskItem.priority = parseInt(change.value);
    this.updateTaskItemSub$ = this.taskItemService.updateTaskItem(taskItem).subscribe((updatedTask) => {
      this.actionEvent.emit(new TaskEvent(TaskEvenType.priorityChange, updatedTask));
    });
  }

  public sortMobile(column: Column) {

    this.columns.forEach((c) => {
      c.isCurrentSort = false;
    });
    column.isCurrentSort = true;

    column.isAscending = this.propertyToSort === column.property ? !column.isAscending : true;
    this.propertyToSort = column.property;
    this.taskItemService.sortTaskItemList(this.taskItemList, column.property, column.isAscending);
  }
  public sort(sort: Sort) {
    this.taskItemService.sortTaskItemList(this.taskItemList, sort.active, sort.direction !== 'desc');
  }

  public moveTaskStatus(taskItem: TaskItem) {
    let destination: string;
    if (this.completedMode) {
      taskItem.taskItemStatusId = TaskItemStatus.inProgress;
      destination = 'not completed.';
    }
    else {
      taskItem.taskItemStatusId = TaskItemStatus.completed;
      destination = 'completed.';
    }

    this.taskItemService.updateTaskItem(taskItem).subscribe((response) => {
      this.taskItemService.removeTaskFromList(taskItem, this.taskItemList);
      this.actionEvent.emit(new TaskEvent(TaskEvenType.moveStatus, response));
      this.snackbar.open("task moved to " + destination, '', {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 3000
      });
    });
  }

  //TODO this code is duplicatesd is there a way to make it a service,component, etc.
  public addTaskItem() {
    const taskItem = new TaskItem();
    taskItem.goalId = this.goal.id;

    this.afterClosedSub$ = this.modalService.taskItemModal(taskItem).
      afterClosed().subscribe((taskItem: TaskItem) => {
        if (taskItem) {
          this.addTaskItemSub$ = this.taskItemService.addTaskItem(taskItem).subscribe((response) => {
            //TODO remove this if we are not going to use the completed property
            response.completed = (taskItem.taskItemStatusId === TaskItemStatus.completed);
            this.actionEvent.emit(new TaskEvent(TaskEvenType.add, response));
          });
        }
      });
  }

  deleteTaskItem(taskItem: TaskItem) {

    this.deleteAfterClosedSub$ = this.modalService.deleteTaskModal(taskItem).afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.taskItemService.deleteTaskItem(taskItem.id).subscribe(() => {
          this.taskItemService.removeTaskFromList(taskItem, this.taskItemList);
          this.actionEvent.emit(new TaskEvent(TaskEvenType.delete, taskItem));
        });
      }
    });
  }

  public editTaskItem(taskItem: TaskItem) {

    let taskItemStatusId = taskItem.taskItemStatusId;
    this.afterClosedSub$ = this.modalService.taskItemModal(taskItem).afterClosed().subscribe((taskItem: TaskItem) => {
      if (taskItem) {
        this.updateTaskItemSub$ = this.taskItemService.updateTaskItem(taskItem).subscribe((updatedTask) => {
          Object.assign(taskItem, updatedTask);
          taskItem.completed = (taskItem.taskItemStatusId === TaskItemStatus.completed);
          if (taskItemStatusId !== taskItem.taskItemStatusId) {
            this.taskItemService.removeTaskFromList(taskItem, this.taskItemList);
            this.actionEvent.emit(new TaskEvent(TaskEvenType.moveStatus, taskItem));
          }
          else {
            this.actionEvent.emit(new TaskEvent(TaskEvenType.edit, taskItem));
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.afterClosedSub$?.unsubscribe();
    this.addTaskItemSub$?.unsubscribe();
    this.deleteAfterClosedSub$?.unsubscribe();
    this.updateTaskItemSub$?.unsubscribe();
    this.paramsSub$?.unsubscribe();
    this.getGoalSub$?.unsubscribe();
  }
}