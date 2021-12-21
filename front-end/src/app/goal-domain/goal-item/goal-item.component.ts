import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Confirm, ConfirmModalComponent } from 'src/app/confirm-modal/confirm-modal.component';
import { IconColorService } from 'src/app/iconColor.service';
import { TaskItemModalComponent } from 'src/app/task-domain/task-item-modal/task-item-modal.component';
import { TaskItemService, TaskItemStatus } from 'src/app/task-domain/task-item.service';
import { TaskItem } from 'src/app/task-domain/task-item/task-item.type';
import { GoalService } from '../goal.service';
import { Goal } from '../goal.type';

export enum GoalEventType {
  moveToCompleted,
  moveToNotCompleted,
  taskAdded,
  deleted
}

export class GoalEvent {

  constructor(public goal: Goal, public type: GoalEventType, public taskItem?: TaskItem) { }
}

@Component({
  selector: 'app-goal-item',
  templateUrl: './goal-item.component.html',
  styleUrls: ['./goal-item.component.scss']
})
export class GoalItemComponent implements OnInit, OnDestroy {
  @Input() goal!: Goal;
  @Output() event: EventEmitter<GoalEvent> = new EventEmitter<GoalEvent>();
  afterClosedSub$!: Subscription;
  addTaskItemSub$!: Subscription;
  constructor(public iconColorService: IconColorService,
    private dialog: MatDialog, private taskItemService: TaskItemService,
    private goalService: GoalService
  ) { }


  ngOnInit(): void {
  }

  deleteGoal() {
    let confirm: Confirm = {
      question: `Delete Goal?`, yesAnswer: 'Delete', noAnswer: 'Cancel', nameOfEntity: this.goal.name
    }

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      disableClose: true,
      data: confirm
    });

    this.afterClosedSub$ = dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.goalService.deleteGoal(this.goal.id).subscribe(() => {
          this.event.emit(new GoalEvent(this.goal, GoalEventType.deleted));  
        });
      }
    })
  }
  public addTaskItem() {
    const taskItem = new TaskItem();
    taskItem.goalId = this.goal.id;
    const dialogRef = this.dialog.open(TaskItemModalComponent, {
      data: taskItem,
      disableClose: true
    });

    this.afterClosedSub$ = dialogRef.afterClosed().subscribe((taskItem: TaskItem) => {
      this.addTaskItemSub$ = this.taskItemService.addTaskItem(taskItem).subscribe((taskResponse) => {

        this.goal.taskCount++;
        if (taskResponse.taskItemStatusId === TaskItemStatus.completed) {
          this.goal.taskCompleted++;
        }
        this.event.emit(new GoalEvent(this.goal, GoalEventType.taskAdded, taskResponse));
      });
    })
  }

  moveToCompleted(goal: Goal) {
    this.event.emit(new GoalEvent(goal, GoalEventType.moveToCompleted));
  }

  moveToNotCompleted(goal: Goal) {
    this.event.emit(new GoalEvent(goal, GoalEventType.moveToNotCompleted));
  }

  ngOnDestroy(): void {
    this.afterClosedSub$?.unsubscribe();
    this.addTaskItemSub$?.unsubscribe();

  }
}
