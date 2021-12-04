import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  removeTaskFromList = (taskItem: TaskItem, taskItemList: TaskItem[]) => {

    //remove task item form list
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

  filterTaskItemListByStatus = (taskItemList: TaskItem[], status: TaskItemStatus): TaskItem[] => {

    return taskItemList.filter((t) => {
      return t.taskItemStatusId == status;
    })

  }
}
