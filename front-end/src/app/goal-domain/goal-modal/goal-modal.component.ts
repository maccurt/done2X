import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControlService } from 'src/app/form-control.service';
import { Goal } from '../goal.type';


@Component({
  selector: 'app-goal-modal',
  templateUrl: './goal-modal.component.html',
  styleUrls: ['./goal-modal.component.less']
})
export class GoalModalComponent implements OnInit {

  goal!: Goal;
  formGroup!: FormGroup
  nameControl!: FormControl;
  descriptionControl!: FormControl;
  whatIsDoneControl!: FormControl;
  showErrors: boolean = false;
  completionTargetDateControl!: FormControl;
  minimumTargetCompletionDate!:Date;
  maxTargetCompletionDate!: Date;

  constructor(private dialogRef: MatDialogRef<GoalModalComponent>,
    @Inject(MAT_DIALOG_DATA) goal: Goal,
    public formControlService: FormControlService) {
    this.goal = goal;
  }


  ngOnInit(): void {

    this.nameControl = new FormControl(this.goal.name, Validators.required);
    this.descriptionControl = new FormControl(this.goal.description, Validators.required);
    this.whatIsDoneControl = new FormControl(this.goal.whatIsDone, Validators.required);
    this.completionTargetDateControl = new FormControl(new Date(), Validators.required);
    this.minimumTargetCompletionDate = new Date(Date.now());
    

    this.formGroup = new FormGroup({
      name: this.nameControl,
      description: this.descriptionControl,
      whatIsDone: this.whatIsDoneControl,
      completionTargetDate: this.completionTargetDateControl
    });
  }

  save(): void {
    if (this.formGroup.valid) {
      this.showErrors = false;
      const formValue = this.formGroup.value;
      Object.assign(this.goal, this.formGroup.value);
      this.dialogRef.close(this.goal)
    }
    else {
      this.showErrors = true;
    }
  }

  cancel(): void {
    console.log(this.completionTargetDateControl.valid);
    this.dialogRef.close()
  }

}