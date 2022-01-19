import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { IconColorService } from 'src/app/iconColor.service';
import { ModalService } from 'src/app/modal.service';
import { TaskItemService, TaskItemStatus } from 'src/app/task-domain/task-item.service';
import { TaskItem } from 'src/app/task-domain/task-item/task-item.type';
import { GoalService } from '../goal.service';
import { Goal } from '../goal.type';
import { GoalEvent } from './goal-event.type';
import { GoalEventType } from './goal-event.enum';
import { MathService } from 'src/app/math.service';

@Component({
  selector: 'd2x-goal-item',
  templateUrl: './goal-item.component.html',
  styleUrls: ['./goal-item.component.scss']
})
export class GoalItemComponent implements OnDestroy {
  @Input() goal!: Goal;
  @Output() event: EventEmitter<GoalEvent> = new EventEmitter<GoalEvent>();
  afterClosedSub$!: Subscription;
  addTaskItemSub$!: Subscription;
  updateGoalSub$!: Subscription;
  constructor(public iconColorService: IconColorService,
    private taskItemService: TaskItemService,
    private goalService: GoalService,
    private modalService: ModalService,
    private mathService: MathService
  ) { }

  editGoal() {
    this.modalService.goalModal(this.goal).afterClosed().subscribe(goal => {
      if (goal) {
        this.goalService.updateGoal(goal).subscribe((response) => {
          //TODO this is a hack because the material date picker changes the date format
          //this is so it will sort correctly, can we find a better way
          this.goal.targetCompletionDate = response.targetCompletionDate;
          this.event.emit(new GoalEvent(this.goal, GoalEventType.edit));
        });
      }
    });
  }

  deleteGoal() {
    this.afterClosedSub$ = this.modalService.deleteGoalModal(this.goal).afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.goalService.deleteGoal(this.goal.id).subscribe(() => {
          this.event.emit(new GoalEvent(this.goal, GoalEventType.deleted));
        });
      }
    });
  }

  public addTaskItem() {
    const taskItem = new TaskItem();
    taskItem.goalId = this.goal.id;

    this.afterClosedSub$ = this.modalService.taskItemModal(taskItem).afterClosed().subscribe((taskItem: TaskItem) => {
      if (taskItem) {
        this.addTaskItemSub$ = this.taskItemService.addTaskItem(taskItem).subscribe((taskResponse) => {
          this.goal.taskCount++;
          if (taskResponse.taskItemStatusId === TaskItemStatus.completed) {
            this.goal.taskCompleted++;
          }
          this.goal.percentCompleted = this.mathService.getPercent(this.goal.taskCompleted, this.goal.taskCount);
          this.event.emit(new GoalEvent(this.goal, GoalEventType.taskAdded, taskResponse));
        });
      }
    });
  }

  moveToCompleted(goal: Goal) {
    goal.isCompleted = true;
    this.updateGoalSub$ = this.goalService.updateGoal(goal).subscribe((response) => {
      this.event.emit(new GoalEvent(goal, GoalEventType.moveToCompleted));
    }, () => {
      goal.isCompleted = false;
    });
  }

  moveToNotCompleted(goal: Goal) {
    goal.isCompleted = false;
    this.updateGoalSub$ = this.goalService.updateGoal(goal).subscribe((response) => {
      this.event.emit(new GoalEvent(goal, GoalEventType.moveToNotCompleted));
    }, () => {
      goal.isCompleted = true;
    });
  }

  ngOnDestroy(): void {
    this.afterClosedSub$?.unsubscribe();
    this.addTaskItemSub$?.unsubscribe();
    this.updateGoalSub$?.unsubscribe();
  }
}
