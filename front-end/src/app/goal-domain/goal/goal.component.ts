import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Code, CodeService } from 'src/app/code.service';
import { TaskItemModalComponent } from 'src/app/task-item-modal/task-item-modal.component';
import { TaskItemService, TaskItemStatus } from 'src/app/task-item.service';
import { TaskItem } from 'src/app/task-item/task-item.type';
import { Goal } from '../goal.type';
import { orderBy } from 'lodash';
import { FormControlService } from 'src/app/form-control.service';
import { GoalService } from '../goal.service';
//Icons
import { faCoffee, faEdit, faWrench, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Confirm, ConfirmModalComponent } from 'src/app/confirm-modal/confirm-modal.component';

export class Column {
  text!: string;
  property!: string;
}

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss']
})
export class GoalComponent implements OnInit {
  //icons
  faCoffee = faCoffee;
  editIcon = faWrench;
  deleteIcon = faTrash;
  //
  routeDataSub$!: Subscription;
  goal!: Goal;
  taskItemList: TaskItem[] = [];
  afterClosedSub$!: Subscription;
  addTaskItemSub$!: Subscription;
  updateTaskItemSub$!: Subscription;
  taskItemStatusList: Code[] = [];
  // taskItemListIdSorted: Code[] = [];
  columns: Column[] = [
    { text: 'Completed', property: 'completed' },
    { text: 'Task', property: 'name' },
    { text: 'Priority', property: 'priority' }]
  column?: Column = this.columns[0];
  proprtyToSort: string = 'completed';
  priorityList: Code[] = [];


  //form controls
  // taskListFormGroup!: FormGroup
  // taskItemStatusControl!: FormControl;
  formGroup!: FormGroup
  nameControl!: FormControl;
  descriptionControl!: FormControl;
  whatIsDoneControl!: FormControl;
  showErrors: boolean = false;
  targetCompletionDateControl!: FormControl;
  minimumTargetCompletionDate!: Date;
  maxTargetCompletionDate!: Date;
  panelOpenState = false;
  updateGoalSub$!: Subscription;
  deleteAfterClosedSub$!: Subscription;

  constructor(private route: ActivatedRoute,
    private taskItemService: TaskItemService,
    private dialog: MatDialog,
    private codeService: CodeService,
    private goalService: GoalService,
    public formControlService: FormControlService) { }

  ngOnInit(): void {

    //Set up the datw
    this.routeDataSub$ = this.route.data.subscribe((data) => {
      this.goal = data.goal;
      this.taskItemList = data.taskItemList;
      this.taskItemStatusList = data.taskItemStatusList;

      this.taskItemList.forEach((taskItem) => {
        taskItem.completed = (taskItem.taskItemStatusId === TaskItemStatus.completed);
      })

      this.codeService.GetPriority().subscribe((priorityList) => {
        this.priorityList = priorityList
      })

      //set up the form
      this.nameControl = new FormControl(this.goal.name, Validators.required);
      this.descriptionControl = new FormControl(this.goal.description, Validators.required);
      this.whatIsDoneControl = new FormControl(this.goal.whatIsDone, Validators.required);
      this.targetCompletionDateControl = new FormControl(this.goal.targetCompletionDate, Validators.required);

      this.formGroup = new FormGroup({
        name: this.nameControl,
        description: this.descriptionControl,
        whatIsDone: this.whatIsDoneControl,
        targetCompletionDate: this.targetCompletionDateControl
      });

    });
  }

  public getPriorityText(taskItem: TaskItem): string {
    return this.priorityList[taskItem.priority - 1].name;
  }

  createTaskItemStatusListIdSorted(taskItemStatusList: Code[]): Code[] {
    //TODO this is used to get the priority text, re-think this performance wise
    //TODO move this somewhere
    //Use lodash instead sortby
    const list = taskItemStatusList.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    })

    return list;
  }

  public sort(property: string) {

    if (this.proprtyToSort !== property) {
      this.taskItemList = orderBy(this.taskItemList, [property], ['asc'])
      this.proprtyToSort = property;
    }
    else {
      this.taskItemList = orderBy(this.taskItemList, [property], ['desc'])
      this.proprtyToSort = '';
    }
  }

  public save() {

    if (this.formGroup.valid) {
      Object.assign(this.goal, this.formGroup.value);
      this.updateGoalSub$ = this.goalService.updateGoal(this.goal).subscribe((response) => {
        console.log('response', response);
      })
      this.showErrors = false;

    }
    else {
      this.showErrors = true;
    }

  }

  public cancel() {

  }
  public addTaskItem() {

    const taskItem = new TaskItem();
    taskItem.goalId = this.goal.id;
    const dialogRef = this.dialog.open(TaskItemModalComponent, {
      data: taskItem,
      disableClose: true
    });

    this.afterClosedSub$ = dialogRef.afterClosed().subscribe((taskItem: TaskItem) => {
      this.addTaskItemSub$ = this.taskItemService.addTaskItem(taskItem).subscribe((response) => {
        response.completed = (taskItem.taskItemStatusId === TaskItemStatus.completed);
        this.taskItemList.unshift(response);
      });
    })
  }

  deleteTaskItem(taskItem: TaskItem) {
    let confirm: Confirm = {
      question: `Delete Task?`, yesAnswer: 'Delete', noAnswer: 'Cancel', nameOfEntity: taskItem.name
    }

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      disableClose: true,
      data: confirm
    });

    this.deleteAfterClosedSub$ = dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.taskItemService.deleteTaskItem(taskItem.id).subscribe(() => {

          //remove task item form list
          let index = this.taskItemList.indexOf(taskItem);
          if (index > -1) {
            this.taskItemList.splice(index, 1);
          }

        })
      }
    })
  }

  public editTaskItem(taskItem: TaskItem) {

    const dialogRef = this.dialog.open(TaskItemModalComponent, {
      data: taskItem,
      disableClose: true
    });

    this.afterClosedSub$ = dialogRef.afterClosed().subscribe((taskItem: TaskItem) => {
      console.log(taskItem);
      if (taskItem) {
        this.updateTaskItemSub$ = this.taskItemService.updateTaskItem(taskItem).subscribe((updatedTask) => {
          Object.assign(taskItem, updatedTask);
          taskItem.completed = (taskItem.taskItemStatusId === TaskItemStatus.completed);
        });
      }
    })

  }
  public updateTaskItemStatus(taskItem: TaskItem) {

    taskItem.taskItemStatusId = taskItem.completed ? TaskItemStatus.completed : TaskItemStatus.backLog;
    this.taskItemService.updateTaskItem(taskItem).subscribe((response) => {
      Object.assign(taskItem, response);
    })
  }
}
