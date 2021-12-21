import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { orderBy } from 'lodash';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PriorityPipe } from '../pipes/priority.pipe';
import { TaskItem } from './task-item/task-item.type';


export enum TaskItemStatus {
  unknown = 0,
  backLog = 1,
  inProgress = 2,
  completed = 3
}

@Injectable({
  providedIn: 'root'
})
export class TaskItemService {

  constructor(private httpClient: HttpClient) { }

  sortTaskItemList(taskItemList: TaskItem[], property: string, ascending = true) {

    let sorted: TaskItem[] = [];
    if (ascending) {
      sorted = orderBy(taskItemList, [property], ['asc']);
    }
    else {
      sorted = orderBy(taskItemList, [property], ['desc']);
    }
    Object.assign(taskItemList, sorted);
  }

  removeTaskFromList = (taskItem: TaskItem, taskItemList: TaskItem[]) => {    
    let index = taskItemList.indexOf(taskItem);
    if (index > -1) {
      taskItemList.splice(index, 1);
    }
  }

  getCompletedTaskItems = (taskItemList: TaskItem[]): TaskItem[] => {
    return taskItemList.filter((t) => {
      return (t.taskItemStatusId === TaskItemStatus.completed);
    })
  }

  getNotCompletedTaskItems = (taskItemList: TaskItem[]): TaskItem[] => {
    return taskItemList.filter((t) => {
      return (t.taskItemStatusId !== TaskItemStatus.completed);
    })
  }

  addTaskItem = (taskItem: TaskItem): Observable<TaskItem> => {
    return this.httpClient
      .post<TaskItem>(environment.API_URL + 'taskItem', taskItem);
  }

  updateTaskItem = (taskItem: TaskItem): Observable<TaskItem> => {
    return this.httpClient
      .put<TaskItem>(environment.API_URL + 'taskItem', taskItem);
  }

  deleteTaskItem = (taskItemId: number): Observable<Boolean> => {
    return this.httpClient
      .delete<Boolean>(environment.API_URL + `taskItem/${taskItemId}`);
  }

  getTaskItemList = (goalId: number): Observable<TaskItem[]> => {

    return this.httpClient
      .get<TaskItem[]>(`${environment.API_URL}taskItem/goal/${goalId}`);
  }

  moveTaskItemListToGoal = (taskItemIdList: number[], goalId: number):Observable<any> => {

    return this.httpClient
      .post<TaskItem[]>(`${environment.API_URL}taskItem/move/${goalId}`,taskItemIdList);
  }

  filterTaskItemListByStatus = (taskItemList: TaskItem[], status: TaskItemStatus): TaskItem[] => {

    return taskItemList.filter((t) => {
      return t.taskItemStatusId == status;
    })

  }
}
