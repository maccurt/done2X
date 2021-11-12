import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  routeData$!: Subscription;

  constructor(private goalService: GoalService, private route: ActivatedRoute,) { }

  public ngOnInit(): void {

    this.routeData$ = this.route.data.subscribe((data) => {
      this.goalList = data.goalList;

    })

  }

  public ngOnDestroy(): void {
    this.routeData$?.unsubscribe();
  }
}