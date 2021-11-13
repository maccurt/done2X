import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class Goal {
  id!: number;
  projectId!: number;
  name!: string;
  description!: string;
  whatIsDone!: string;
  createdDate!: Date;

}

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  constructor(private httpClient: HttpClient) { }

  public addGoal(goal: Goal): Observable<Goal> {
    const projectId = localStorage.getItem('project-id');
    if (projectId) {
      goal.projectId = +projectId;
    }
    return this.httpClient
      .post<Goal>(environment.API_URL + 'goal', goal);
  }

  public updateGoal(goal: Goal): Observable<Goal> {
    return this.httpClient
      .put<Goal>(environment.API_URL + 'goal', goal);
  }

  public GetGoalList(): Observable<Goal[]> {
    return this.httpClient.get<Goal[]>(`${environment.API_URL}goal`);
  }
}
