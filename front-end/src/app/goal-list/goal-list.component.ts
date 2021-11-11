import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';
import { Goal, GoalService } from '../goal.service';

@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.less']
})
export class GoalListComponent implements OnInit {

  goalList: Goal[] = [];

  isAuthenticated$!: Subscription;

  constructor(private goalService: GoalService, private authService: AuthService) {

  }

  public ngOnInit(): void {
    this.isAuthenticated$ = this.authService.isAuthenticated$.subscribe(() => {

      this.goalService.GetGoalList().subscribe((goalList) => {
        this.goalList
       });

    })
  }

  public ngOnDestroy(): void {
    this.isAuthenticated$?.unsubscribe();
  }
}