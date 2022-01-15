import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { orderBy } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';
import { Goal } from './goal.type';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  constructor(private httpClient: HttpClient) { }

  // sortGoalist(goalList: Goal[], property: string, ascending = true) {

  //   let sorted: Goal[] = [];
  //   if (ascending) {
  //     sorted = orderBy(goalList, [property], ['asc']);
  //   }
  //   else {
  //     sorted = orderBy(goalList, [property], ['desc']);
  //   }
  //   Object.assign(goalList, sorted);
  // }

  public deleteGoal(goalId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(environment.API_URL + `goal/${goalId}`);
  }

  removeGoalFromList = (goal: Goal, goalList: Goal[]) => {
    let index = goalList.indexOf(goal);
    if (index > -1) {
      goalList.splice(index, 1);
    }
  }

  public addGoal(goal: Goal): Observable<Goal> {

    goal.projectId;
    return this.httpClient
      .post<Goal>(environment.API_URL + 'goal', goal);
  }

  public updateGoal(goal: Goal): Observable<Goal> {
    return this.httpClient
      .put<Goal>(environment.API_URL + 'goal', goal);
  }

  public GetGoalList(projectId: number): Observable<Goal[]> {
    return this.httpClient.get<Goal[]>(`${environment.API_URL}goal/project/${projectId}`);
  }

  public getGoal(goalId: number): Observable<Goal> {
    return this.httpClient.get<Goal>(`${environment.API_URL}goal/${goalId}`);
  }
}
