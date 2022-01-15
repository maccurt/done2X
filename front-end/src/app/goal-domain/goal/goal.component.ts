import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Code, CodeService } from 'src/app/code.service';
import { TaskItem } from 'src/app/task-domain/task-item/task-item.type';
import { Goal } from '../goal.type';
import { FormControlService } from 'src/app/form-control.service';
import { GoalService } from '../goal.service';
import { TaskItemService, TaskItemStatus } from 'src/app/task-domain/task-item.service';
import { Chart } from 'angular-highcharts';
import { ChartServiceDone2x } from 'src/app/chart-domain/chart.service';
import { TypeClickEvent } from 'src/app/task-domain/task-item/TypeClickEvent';
import { TypeAction } from 'src/app/task-domain/task-item/TypeAction';
import { MatExpansionPanel } from '@angular/material/expansion';
import { PriorityData } from 'src/app/chart-domain/priority-data.type';
import { IconColorService } from 'src/app/iconColor.service';

export class Column {
  text!: string;
  property!: string;
}

@Component({
  selector: 'd2x-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss']
})
export class GoalComponent implements OnInit, OnDestroy {
  @ViewChild(MatExpansionPanel, { static: true }) matExpansionPanelElement!: MatExpansionPanel;
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
  priorityData: PriorityData = new PriorityData(0, 0, 0);

  //Subscriptions
  updateGoalSub$!: Subscription;
  routeDataSub$!: Subscription;
  getPrioritySub$!: Subscription;

  constructor(private route: ActivatedRoute,
    private taskItemService: TaskItemService,
    private codeService: CodeService,
    private goalService: GoalService,
    private chartService: ChartServiceDone2x,
    public formControlService: FormControlService,
    public iconColorService: IconColorService) { }

  ngOnInit(): void {
    //Set up the data
    this.routeDataSub$ = this.route.data.subscribe((data) => {
      this.goal = data.goal;
      this.taskItemList = data.taskItemList;
      this.taskItemStatusList = data.taskItemStatusList;

      this.completedTaskItemList = this.taskItemService.getCompletedTaskItems(data.taskItemList);
      this.notCompletedTaskItemList = this.taskItemService.getNotCompletedTaskItems(data.taskItemList);

      this.createCompletedChart();
      this.createPriorityChart();

      this.getPrioritySub$ = this.codeService.GetPriority().subscribe((priorityList) => {
        this.priorityList = priorityList;
      });

      //set up the form
      this.nameControl = new FormControl(this.goal.name, Validators.required);
      this.descriptionControl = new FormControl(this.goal.description);
      this.whatIsDoneControl = new FormControl(this.goal.whatIsDone);
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
        this.addTaskToCorrectLane(event.item);
        this.createPriorityChart();
        this.createCompletedChart();
        break;
      case TypeAction.moveStatus:
        this.addTaskToCorrectLane(event.item);
        this.createCompletedChart();
        break;
      case TypeAction.delete:
      case TypeAction.moveTaskItemListToGoal:
        this.createPriorityChart();
        this.createCompletedChart();
        break;
      case TypeAction.priorityChange:
        this.createPriorityChart();
        break;
    }
  }

  public createCompletedChart() {
    this.completedChart = this.chartService.completedPieChart(this.completedTaskItemList.length,
      this.notCompletedTaskItemList.length);
  }

  public createPriorityChart() {
    this.priorityData = this.chartService.getPriorityData([...this.completedTaskItemList, ...this.notCompletedTaskItemList]);
  }

  public getPriorityText(taskItem: TaskItem): string {
    return this.priorityList[taskItem.priority - 1].name;
  }

  public save() {
    if (this.formGroup.valid) {
      Object.assign(this.goal, this.formGroup.value);
      
      this.updateGoalSub$ = this.goalService.updateGoal(this.goal).subscribe((response) => {
      });
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