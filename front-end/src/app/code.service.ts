import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

export class Code {
  id!: number;
  name!: string;
  order?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor(private httpClient: HttpClient) { }

  public GetTaskItemStatus(): Observable<Code[]> {
    //TODO in the future find a way to cache this. OR re-think, do you need API could you hard code them here perhaps?
    return this.httpClient.get<Code[]>(environment.API_URL + 'code/TaskItemStatus');
  }

  public GetPriority(): Observable<Code[]> {
    const priorityList: Code[] = [];
    priorityList.push({ id: 1, name: 'High' });
    priorityList.push({ id: 2, name: 'Medium' });
    priorityList.push({ id: 3, name: 'Low' });
    return of(priorityList);

  }
}
