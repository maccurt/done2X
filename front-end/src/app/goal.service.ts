import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class Goal {
  id!: number;
  name!: string;
  description!: string;
  
}


@Injectable({
  providedIn: 'root'
})
export class GoalService {

  constructor(private httpClient: HttpClient) { }

  public GetGoalList(): Observable<Goal[]> {
    return this.httpClient.get<Goal[]>(`${environment.API_URL}goal`);   
  }  
}
