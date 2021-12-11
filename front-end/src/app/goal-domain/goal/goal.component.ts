import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Code, CodeService } from 'src/app/code.service';

import { TaskItem } from 'src/app/task-domain/task-item/task-item.type';
import { Goal } from '../goal.type';
import { FormControlService } from 'src/app/form-control.service';
import { GoalService } from '../goal.service';
//Icons
import { faCoffee, faWrench, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TaskItemService, TaskItemStatus } from 'src/app/task-domain/task-item.service';
import { Chart } from 'angular-highcharts';
import { ChartServiceDone2x } from 'src/app/chart-domain/chart.service';
import { TypeClickEvent } from 'src/app/task-domain/task-item/TypeClickEvent';
import { TypeAction } from 'src/app/task-domain/task-item/TypeAction';
import { MatExpansionPanel } from '@angular/material/expansion';

export class Column {
  text!: string;
  property!: string;
}

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss']
})
export class GoalComponent implements OnInit, OnDestroy {
  @ViewChild(MatExpansionPanel, { static: true }) matExpansionPanelElement!: MatExpansionPanel;
  //icons
  faCoffee = faCoffee;
  editIcon = faWrench;
  deleteIcon = faTrash;
  goal!: Goal;

  completedTaskItemList: TaskItem[] = [];
  notCompletedTaskItemList: TaskItem[] = [];
  taskItemStatusList: Code[] = [];
  taskItemList: TaskItem[] = [];
  columns: Column[] = [
    { text: 'Completed', property: 'completed' },
    { text: 'Task', property: 'name' },
    { text: 'Priority', property: 'priority' }]
  column?: Column = this.columns[0];
  proprtyToSort: string = 'completed';
  priorityList: Code[] = [];

  hideCompleted = false;

  //form controls  
  formGroup!: FormGroup
  nameControl!: FormControl;
  descriptionControl!: FormControl;
  whatIsDoneControl!: FormControl;
  showErrors: boolean = false;
  targetCompletionDateControl!: FormControl;
  minimumTargetCompletionDate!: Date;
  maxTargetCompletionDate!: Date;
  panelOpenState = false;

  //chart
  completedChart!: Chart;

  //Subscriptions
  updateGoalSub$!: Subscription;
  routeDataSub$!: Subscription;
  getPrioritySub$!: Subscription;
  chartChangeEvent: Subject<TaskItem[]> = new Subject();

  constructor(private route: ActivatedRoute,
    private taskItemService: TaskItemService,
    private dialog: MatDialog,
    private codeService: CodeService,
    private goalService: GoalService,
    private chartService: ChartServiceDone2x,
    public formControlService: FormControlService) { }


  ngOnInit(): void {
        
    //Set up the data
    this.routeDataSub$ = this.route.data.subscribe((data) => {
      this.goal = data.goal;
      this.taskItemList = data.taskItemList;
      this.taskItemStatusList = data.taskItemStatusList;

      this.completedTaskItemList = this.taskItemService.getCompletedTaskItems(data.taskItemList);
      this.notCompletedTaskItemList = this.taskItemService.getNotCompletedTaskItems(data.taskItemList);

      this.createCompletedChart();

      this.getPrioritySub$ = this.codeService.GetPriority().subscribe((priorityList) => {
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

  public addTaskToCorrectLane(taskItem: TaskItem) {
    if (taskItem.taskItemStatusId === TaskItemStatus.completed) {
      this.completedTaskItemList.unshift(taskItem);
    }
    else {
      this.notCompletedTaskItemList.unshift(taskItem);
    }
  }

  public actionEvent(event: TypeClickEvent<TaskItem>) {
    switch (event.action) {
      case TypeAction.add:
        this.addTaskToCorrectLane(event.item)
        this.chartChangeEvent.next([...this.completedTaskItemList, ...this.notCompletedTaskItemList]);
        this.createCompletedChart();
        break;
      case TypeAction.moveStatus:
        this.addTaskToCorrectLane(event.item)
        this.createCompletedChart();
        break;
      case TypeAction.delete:
        this.chartChangeEvent.next([...this.completedTaskItemList, ...this.notCompletedTaskItemList]);
        this.createCompletedChart();
        break;
      case TypeAction.priorityChange:
        this.chartChangeEvent.next([...this.completedTaskItemList, ...this.notCompletedTaskItemList]);
        break;
    }
  }

  public createCompletedChart() {
    this.completedChart = this.chartService.completedPieChart(this.completedTaskItemList.length,
      this.notCompletedTaskItemList.length)
  }

  public getPriorityText(taskItem: TaskItem): string {
    return this.priorityList[taskItem.priority - 1].name;
  }

  public save() {

    if (this.formGroup.valid) {
      Object.assign(this.goal, this.formGroup.value);
      this.updateGoalSub$ = this.goalService.updateGoal(this.goal).subscribe((response) => {
      })
      this.showErrors = false;
      this.createCompletedChart();
      this.matExpansionPanelElement.close();
    }
    else {
      this.showErrors = true;
    }
  }

  hideCompletedClick() {
    this.hideCompleted = !this.hideCompleted;
  }

  public cancel() {
    this.hideCompleted = !this.hideCompleted;
  }

  ngOnDestroy(): void {
    this.updateGoalSub$?.unsubscribe();
    this.routeDataSub$?.unsubscribe();
    this.getPrioritySub$?.unsubscribe();
  }
}