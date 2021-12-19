import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { orderBy } from 'lodash';
import { Subscription } from 'rxjs';
import { IconColorService } from 'src/app/iconColor.service';
import { TaskItemStatus } from 'src/app/task-domain/task-item.service';
import { GoalEvent, GoalEventType } from '../goal-item/goal-item.component';
import { GoalModalComponent } from '../goal-modal/goal-modal.component';
import { GoalService } from '../goal.service';
import { Goal } from '../goal.type';

@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.scss']
})
export class GoalListComponent implements OnInit, OnDestroy {
  goalList: Goal[] = [];
  goalListCompleted: Goal[] = [];
  goalListNotCompleted: Goal[] = [];
  routeData$!: Subscription;
  addGoalSub$!: Subscription;
  updateGoalSub$!: Subscription;

  taskCompletedCount = 0;
  taskNotCompletedCount = 0;
  taskCount = 0;

  constructor(private goalService: GoalService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public iconColorService: IconColorService) {
  }

  public ngOnInit(): void {
    this.routeData$ = this.route.data.subscribe((data) => {
      this.goalList = data.goalList;
      this.filterGoalList(this.goalList);
      this.orderGoalList();

      this.goalList.forEach((g) => {
        this.taskCompletedCount += g.taskCompleted;
        this.taskNotCompletedCount += g.taskNotCompleted;
      })
      this.taskCount = this.taskCompletedCount + this.taskNotCompletedCount
    })
  }

  orderGoalList() {
    ///sort the goals by completion date
    this.goalListNotCompleted = orderBy(this.goalListNotCompleted, ['targetCompletionDate'], ['asc']);
  }

  goalEvent(goalEvent: GoalEvent) {
    switch (goalEvent.type) {
      case GoalEventType.moveToCompleted:
        this.moveToCompleted(goalEvent.goal)
        break;
      case GoalEventType.moveToNotCompleted:
        this.moveToNotCompleted(goalEvent.goal)
        break;
      case GoalEventType.taskAdded:
        this.taskCount++;
        //TODO re-think this how we check completed
        if (goalEvent.taskItem?.taskItemStatusId === TaskItemStatus.completed) {
          this.taskCompletedCount++;
        }
        break;
    }
  }

  public filterGoalList(goalList: Goal[]) {
    this.goalListCompleted = goalList.filter((g) => {
      return g.isCompleted
    });

    this.goalListNotCompleted = goalList.filter((g) => {
      return !g.isCompleted
    });
  }

  public moveToNotCompleted(goal: Goal) {
    goal.isCompleted = false;
    this.updateGoalSub$ = this.goalService.updateGoal(goal).subscribe((response) => {
      const index = this.goalListCompleted.indexOf(goal);
      if (index > -1) {
        this.goalListCompleted.splice(index, 1);
      }
      this.goalListNotCompleted.push(goal);
    }, () => {
      goal.isCompleted = true;
    })
  }

  public moveToCompleted(goal: Goal) {
    goal.isCompleted = true;
    this.updateGoalSub$ = this.goalService.updateGoal(goal).subscribe((response) => {
      const index = this.goalListNotCompleted.indexOf(goal);
      if (index > -1) {
        this.goalListNotCompleted.splice(index, 1);
      }
      this.goalListCompleted.push(goal);
    }, () => {
      goal.isCompleted = false;
    })
  }

  public addGoalHere(date: Date) {
    let newGoal = new Goal();
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    newGoal.targetCompletionDate = d;

    this.showGoalModal(newGoal).afterClosed().subscribe((modalGoal) => {
      if (modalGoal) {
        this.addGoalSub$ = this.goalService.addGoal(modalGoal).subscribe((response) => {
          //TODO can you move this into the  UX service perhaps
          //OR FIX the backend to return it correctly
          response.taskCount = 0;
          response.taskNotCompleted = 0;
          response.taskCompleted = 0
          this.goalListNotCompleted.push(response);
          this.orderGoalList();
        })
      }
    });
  }

  public addGoal() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    this.addGoalHere(date);
  }

  public editGoal(goal: Goal) {
    this.showGoalModal(goal).afterClosed().subscribe((modalGoal) => {
      if (modalGoal) {
        this.updateGoalSub$ = this.goalService.updateGoal(modalGoal).subscribe((response) => {
        })
      }
    });
  }

  public showGoalModal(goal: Goal): MatDialogRef<GoalModalComponent, any> {
    return this.dialog.open(GoalModalComponent, {
      data: goal,
      disableClose: true
    })
  }

  public ngOnDestroy(): void {
    this.routeData$?.unsubscribe();
    this.addGoalSub$?.unsubscribe();
  }
}