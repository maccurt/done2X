import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Confirm, ConfirmModalComponent } from 'src/app/confirm-modal/confirm-modal.component';
import { IconColorService } from 'src/app/iconColor.service';
import { ModalService } from 'src/app/modal.service';
import { TaskItemService, TaskItemStatus } from 'src/app/task-domain/task-item.service';
import { TaskItem } from 'src/app/task-domain/task-item/task-item.type';
import { GoalService } from '../goal.service';
import { Goal } from '../goal.type';
import { GoalEvent } from './goal-event.type';
import { GoalEventType } from './goal-event.enum';

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
    private taskItemService: TaskItemService,
    private goalService: GoalService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void { }

  deleteGoal() {

    this.afterClosedSub$ = this.modalService.deleteGoalModal(this.goal).afterClosed().subscribe((confirm: boolean) => {
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

    this.afterClosedSub$ = this.modalService.taskItemModal(taskItem).afterClosed().subscribe((taskItem: TaskItem) => {
      if (taskItem) {
        this.addTaskItemSub$ = this.taskItemService.addTaskItem(taskItem).subscribe((taskResponse) => {
          this.goal.taskCount++;
          if (taskResponse.taskItemStatusId === TaskItemStatus.completed) {
            this.goal.taskCompleted++;
          }
          this.event.emit(new GoalEvent(this.goal, GoalEventType.taskAdded, taskResponse));
        });
      }
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
