import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, Subscription } from 'rxjs';
import { GoalModalComponent } from '../goal-modal/goal-modal.component';
import { Goal, GoalService } from '../goal.service';

@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.less']
})
export class GoalListComponent implements OnInit {

  goalList: Goal[] = [];
  routeData$!: Subscription;
  addGoalSub$!: Subscription;

  constructor(private goalService: GoalService,
    private route: ActivatedRoute,
    private dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.routeData$ = this.route.data.subscribe((data) => {
      this.goalList = data.goalList;
    })
  }

  public addGoal() {
    this.showGoalModal(new Goal()).afterClosed().subscribe((modalGoal) => {
      if (modalGoal) {
        this.addGoalSub$ = this.goalService.addGoal(modalGoal).subscribe((response) => {
        })
      }
    });
  }

  public editGoal(goal: Goal) {

    this.showGoalModal(goal).afterClosed().subscribe((modalGoal) => {
      if (modalGoal) {
        this.addGoalSub$ = this.goalService.updateGoal(modalGoal).subscribe((response) => {
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