import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Code, CodeService } from '../../code.service';
import { TaskItem } from '../task-item/task-item.type';

@Component({
  selector: 'd2x-task-item-modal',
  templateUrl: './task-item-modal.component.html',
  styleUrls: ['./task-item-modal.component.scss']
})
export class TaskItemModalComponent implements OnInit, OnDestroy {

  taskItem!: TaskItem;
  //controls
  formGroup!: FormGroup;
  nameControl!: FormControl
  descriptionControl!: FormControl
  getTaskItemStatusSub$!: Subscription;
  taskItemStatusControl!: FormControl;
  taskTypeControl!: FormControl;
  priorityControl!: FormControl;
  //
  showErrors: boolean = false;
  taskItemStatusList: Code[] = [];
  priorityList: Code[] = [];
  taskTypeList: Code[] = [];

  constructor(private dialogRef: MatDialogRef<TaskItemModalComponent>,
    private codeService: CodeService,
    @Inject(MAT_DIALOG_DATA) taskItem: TaskItem) {

    this.taskItem = taskItem;

  }
  ngOnInit(): void {
    this.nameControl = new FormControl(this.taskItem.name, Validators.required);
    this.descriptionControl = new FormControl(this.taskItem.description);
    this.taskItemStatusControl = new FormControl();
    this.taskTypeControl = new FormControl();
    this.priorityControl = new FormControl();
    //set the taskType
    this.getTaskItemStatusSub$ = this.codeService.GetTaskItemStatus().subscribe((codes) => {
      this.taskItemStatusList = codes;
      //this.taskItemStatusSelected
      const code = this.taskItemStatusList.find((item) => {
        return item.id === this.taskItem.taskItemStatusId;
      });
      this.taskItemStatusControl.setValue(code);
    });

    //set the taskType
    
    this.codeService.GetTaskTypeList().subscribe((codes) => {
      this.taskTypeList = codes;
      const code = this.taskTypeList.find((item) => {
        return item.id === this.taskItem.taskTypeId;
      });      
      this.taskTypeControl.setValue(code);
    });

    //set the priority
    this.codeService.GetPriority().subscribe((codes) => {
      this.priorityList = codes;
      const code = this.priorityList.find((item) => {
        return item.id == this.taskItem.priority;
      });
      this.priorityControl.setValue(code);
    });

    this.formGroup = new FormGroup({
      name: this.nameControl,
      description: this.descriptionControl,
      taskItemStatus: this.taskItemStatusControl,
      taskType: this.taskTypeControl,
      priority: this.priorityControl
    });
  }

  public cancel() {
    this.dialogRef.close(undefined);
  }

  public save(): void {
    if (this.formGroup.valid) {
      Object.assign(this.taskItem, this.formGroup.value);
      this.taskItem.taskItemStatusId = this.taskItemStatusControl.value.id;
      this.taskItem.priority = this.priorityControl.value.id;
      this.taskItem.taskTypeId = this.taskTypeControl.value.id;
      this.taskItem.taskTypeCode = this.taskTypeControl.value;
      this.dialogRef.close(this.taskItem);
    }
    else {
      this.showErrors = true;
    }
  }

  //TODO this is repeated find common place for it
  isInvalid = (control: AbstractControl): boolean => {
    return (control.touched && control.invalid || control.invalid && this.showErrors);
  }

  ngOnDestroy(): void {
    this.getTaskItemStatusSub$?.unsubscribe();
  }
}
