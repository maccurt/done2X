import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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

  constructor(private goalService: GoalService,
    private route: ActivatedRoute,
    private dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.routeData$ = this.route.data.subscribe((data) => {
      this.goalList = data.goalList;
      this.filterGoalList(this.goalList);
    })
  }

  public filterGoalList(goalList: Goal[]) {
    this.goalListCompleted = goalList.filter((g) => {
      return g.isCompleted
    });

    this.goalListNotCompleted = goalList.filter((g) => {
      return !g.isCompleted
    });
  }

  public completeGoal(goal: Goal) {
    goal.isCompleted = true;
    this.updateGoalSub$ = this.goalService.updateGoal(goal).subscribe((response) => {

      const index = this.goalListNotCompleted.indexOf(goal);
      if (index > -1) {
        this.goalListNotCompleted.splice(index, 1);
      }
      this.goalListCompleted.push(goal);
    })
  }

  public addGoal() {
    this.showGoalModal(new Goal()).afterClosed().subscribe((modalGoal) => {
      if (modalGoal) {
        this.addGoalSub$ = this.goalService.addGoal(modalGoal).subscribe((response) => {
          this.goalListNotCompleted.push(response);
          //this.goalList.push(response);
        })
      }
    });
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