import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { orderBy } from 'lodash';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CodeService } from '../code.service';
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

  constructor(private httpClient: HttpClient,
    private codeService: CodeService) { }

  sortTaskItemList(taskItemList: TaskItem[], property: string, ascending = true) {

    //TODO re-think this perhaps you have one service to sort everything?
    //This is duplicated in goal-service to sort goals?
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
    });
  }

  getNotCompletedTaskItems = (taskItemList: TaskItem[]): TaskItem[] => {
    return taskItemList.filter((t) => {
      return (t.taskItemStatusId !== TaskItemStatus.completed);
    });
  }

  addTaskItem = (taskItem: TaskItem): Observable<TaskItem> => {
    return this.httpClient
      .post<TaskItem>(environment.API_URL + 'taskItem', taskItem).pipe(map(taskItem => {
        taskItem.taskTypeCode = this.codeService.getTaskType(taskItem.taskTypeId)
        return taskItem;
      }))
  }

  updateTaskItem = (taskItem: TaskItem): Observable<TaskItem> => {
    return this.httpClient
      .put<TaskItem>(environment.API_URL + 'taskItem', taskItem).pipe(map(taskItem => {
        taskItem.taskTypeCode = this.codeService.getTaskType(taskItem.taskTypeId)
        return taskItem;
      }))
  }

  deleteTaskItem = (taskItemId: number): Observable<Boolean> => {
    return this.httpClient
      .delete<Boolean>(environment.API_URL + `taskItem/${taskItemId}`);
  }

  getTaskItemList = (goalId: number): Observable<TaskItem[]> => {
    return this.httpClient
      .get<TaskItem[]>(`${environment.API_URL}taskItem/goal/${goalId}`).pipe(map((response) => {
        //put the taskTypeCode on each task item;
        response.forEach((t) => {
          t.taskTypeCode = this.codeService.getTaskType(t.taskTypeId)
        })
        return response;
      }))
  }

  moveTaskItemListToGoal = (taskItemList: TaskItem[], goalId: number): Observable<any> => {

    let taskItemIdList: number[] = taskItemList.map(t => t.id);
    return this.httpClient
      .put<TaskItem[]>(`${environment.API_URL}taskItem/move/${goalId}`, taskItemIdList);
  }

  filterTaskItemListByStatus = (taskItemList: TaskItem[], status: TaskItemStatus): TaskItem[] => {
    return taskItemList.filter((t) => {
      return t.taskItemStatusId == status;
    });
  }
}
