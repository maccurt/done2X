import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { orderBy } from 'lodash';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IconColorService } from './iconColor.service';

export class Code {
  id!: number;
  name!: string;
  order?: number;
  icon?: IconDefinition = faQuestion
}

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor(private httpClient: HttpClient,
    private iconColorService: IconColorService) { }

  public GetTaskItemStatus(): Observable<Code[]> {
    //TODO in the future find a way to cache this. OR re-think, do you need API could you hard code them here perhaps?
    return this.httpClient.get<Code[]>(environment.API_URL + 'code/TaskItemStatus');
  }

  public getTaskType(taskTypeId: number) {

    return this.taskListCodes().find((code) => {
      return code.id === taskTypeId;
    });
  }

  private taskListCodes():Code[]{
    //TODO you have to add this to the database ALSO to make it work    
    let priorityList: Code[] = [];
    priorityList.push({ id: 1, name: 'Feature', icon: this.iconColorService.icons.feature });
    priorityList.push({ id: 2, name: 'Defect', icon: this.iconColorService.icons.defect });
    priorityList.push({ id: 3, name: 'Tech Debt', icon: this.iconColorService.icons.techDebt });
    priorityList.push({ id: 4, name: 'Test/Quality', icon: this.iconColorService.icons.test });
    priorityList.push({ id: 5, name: 'Learn', icon: this.iconColorService.icons.learnIcon });
    return orderBy(priorityList, ['name'], ['asc']);

  }
  public GetTaskTypeList(): Observable<Code[]> {
    //TODO in the future this is supposed to come from API. Why it is a observable for now
    return of(this.taskListCodes());
  }

  public GetPriority(): Observable<Code[]> {
    const priorityList: Code[] = [];
    priorityList.push({ id: 1, name: 'High' });
    priorityList.push({ id: 2, name: 'Medium' });
    priorityList.push({ id: 3, name: 'Low' });
    return of(priorityList);
  }
}

