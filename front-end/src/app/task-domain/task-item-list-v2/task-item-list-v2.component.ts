import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, Type } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Confirm, ConfirmModalComponent } from 'src/app/confirm-modal/confirm-modal.component';
// import { ConfirmService } from 'src/app/confirm-modal/confirm.service';
import { GoalService } from 'src/app/goal-domain/goal.service';
import { Goal } from 'src/app/goal-domain/goal.type';
import { IconColorService } from 'src/app/iconColor.service';
import { TaskItemModalComponent } from '../task-item-modal/task-item-modal.component';
import { TaskItemService, TaskItemStatus } from '../task-item.service';
import { TaskItem } from '../task-item/task-item.type';
import { TypeAction } from '../task-item/TypeAction';
import { TypeClickEvent } from '../task-item/TypeClickEvent';

@Component({
  selector: 'd2x-task-item-list-v2',
  templateUrl: './task-item-list-v2.component.html',
  styleUrls: ['./task-item-list-v2.component.scss']
})
export class TaskItemListV2Component implements OnInit, OnDestroy {
  @Input() completedMode: boolean = false;
  @Input() taskItemList: TaskItem[] = [];
  @Input() goal!: Goal;
  @Output() actionEvent = new EventEmitter<TypeClickEvent<TaskItem>>();

  allTaskSelected: boolean = false;
  proprtyToSort: string = 'priority';
  //subscription
  afterClosedSub$!: Subscription;
  addTaskItemSub$!: Subscription;
  deleteAfterClosedSub$!: Subscription;
  updateTaskItemSub$!: Subscription;
  goalList: Goal[] = [];

  constructor(
    private dialog: MatDialog,
    private taskItemService: TaskItemService,
    public iconColorService: IconColorService,
    private goalService: GoalService
  ) { }

  ngOnInit(): void {

    //TODO make it so it only get the completed goals
    this.goalService.GetGoalList().subscribe((goalList) => {
      this.goalList = goalList.filter((g) => {
        return !g.isCompleted && g.id !== this.goal.id && g.targetCompletionDate >= this.goal.targetCompletionDate
      })

      this.goalList = this.goalList.splice(0, 10);
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
    })
  }

  moveTaskToGoal(goal: Goal) {
    const selectedTaskItemList = this.taskItemList.filter((t) => {
      return t.selected;
    })

    let confirm: Confirm = {
      title: '',
      question: `Move ${selectedTaskItemList.length} Task To ${goal.name}?`,
      yesAnswer: 'Yes, Move Task',
      noAnswer: 'No'      
    }

    const confirmDialog = this.dialog.open(ConfirmModalComponent, {
      data: confirm
    })

    confirmDialog.afterClosed().subscribe((yesMove)=>{

      if (yesMove){
        this.taskItemService.moveTaskItemListToGoal(selectedTaskItemList, goal.id).subscribe(() => {
          selectedTaskItemList.forEach((t) => {
            this.taskItemService.removeTaskFromList(t, this.taskItemList);
          })
          //TODO we are passing the first item in the list and that is not correct
          //re think this typeclick event make it specific to task with no generic
          const event = new TypeClickEvent<TaskItem>(TypeAction.moveTaskItemListToGoal, selectedTaskItemList[0]);
          this.actionEvent.emit(event);
        })
      }
    })    
  }

  priorityToggle(change: MatButtonToggleChange, taskItem: TaskItem) {
    //TODO is there a way to bind to the value and not need this method    
    taskItem.priority = parseInt(change.value);
    this.updateTaskItemSub$ = this.taskItemService.updateTaskItem(taskItem).subscribe((updatedTask) => {
      this.actionEvent.emit(new TypeClickEvent(TypeAction.priorityChange, updatedTask));
    });
  }

  public sort(property: string) {
    if (this.proprtyToSort !== property) {
      this.taskItemService.sortTaskItemList(this.taskItemList, property, true);
      this.proprtyToSort = property;
    }
    else {
      this.taskItemService.sortTaskItemList(this.taskItemList, property, false);
      this.proprtyToSort = '';
    }
  }

  public moveTaskStatus(taskItem: TaskItem) {
    if (this.completedMode) {
      taskItem.taskItemStatusId = TaskItemStatus.inProgress;
    }
    else {
      taskItem.taskItemStatusId = TaskItemStatus.completed;
    }

    this.taskItemService.updateTaskItem(taskItem).subscribe((response) => {
      this.taskItemService.removeTaskFromList(taskItem, this.taskItemList);
      this.actionEvent.emit(new TypeClickEvent(TypeAction.moveStatus, response));
    });
  }

  //TODO this code is duplicatesd is there a way to make it a service,component, etc.
  public addTaskItem() {
    const taskItem = new TaskItem();
    taskItem.goalId = this.goal.id;
    const dialogRef = this.dialog.open(TaskItemModalComponent, {
      data: taskItem,
      disableClose: true
    });

    this.afterClosedSub$ = dialogRef.afterClosed().subscribe((taskItem: TaskItem) => {
      this.addTaskItemSub$ = this.taskItemService.addTaskItem(taskItem).subscribe((response) => {
        //TODO remove this if we are not going to use the completed property
        response.completed = (taskItem.taskItemStatusId === TaskItemStatus.completed);
        this.actionEvent.emit(new TypeClickEvent(TypeAction.add, response));
      });
    })
  }

  deleteTaskItem(taskItem: TaskItem) {
    let confirm: Confirm = {
      question: `Delete Task?`, yesAnswer: 'Delete', noAnswer: 'Cancel', nameOfEntity: taskItem.name
    }

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      disableClose: true,
      data: confirm
    });

    this.deleteAfterClosedSub$ = dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.taskItemService.deleteTaskItem(taskItem.id).subscribe(() => {
          this.taskItemService.removeTaskFromList(taskItem, this.taskItemList);
          this.actionEvent.emit(new TypeClickEvent(TypeAction.delete, taskItem));
        })
      }
    })
  }

  public editTaskItem(taskItem: TaskItem) {
    const dialogRef = this.dialog.open(TaskItemModalComponent, {
      data: taskItem,
      disableClose: true
    });

    let taskItemStatusId = taskItem.taskItemStatusId;
    this.afterClosedSub$ = dialogRef.afterClosed().subscribe((taskItem: TaskItem) => {
      if (taskItem) {
        this.updateTaskItemSub$ = this.taskItemService.updateTaskItem(taskItem).subscribe((updatedTask) => {
          Object.assign(taskItem, updatedTask);
          taskItem.completed = (taskItem.taskItemStatusId === TaskItemStatus.completed);

          if (taskItemStatusId !== taskItem.taskItemStatusId) {
            this.taskItemService.removeTaskFromList(taskItem, this.taskItemList);
            this.actionEvent.emit(new TypeClickEvent(TypeAction.moveStatus, taskItem));
          }
        });
      }
    })
  }

  ngOnDestroy(): void {
    this.afterClosedSub$?.unsubscribe;
    this.addTaskItemSub$?.unsubscribe;
    this.deleteAfterClosedSub$?.unsubscribe;
    this.updateTaskItemSub$?.unsubscribe;
  }
}