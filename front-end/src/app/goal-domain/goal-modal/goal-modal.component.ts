import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControlService } from 'src/app/form-control.service';
import { Goal } from '../goal.type';

@Component({
  selector: 'app-goal-modal',
  templateUrl: './goal-modal.component.html',
  styleUrls: ['./goal-modal.component.scss']
})
export class GoalModalComponent implements OnInit {
  goal!: Goal;
  formGroup!: FormGroup
  nameControl!: FormControl;
  descriptionControl!: FormControl;
  whatIsDoneControl!: FormControl;
  showErrors: boolean = false;
  targetCompletionDateControl!: FormControl;
  minimumTargetCompletionDate!: Date;
  maxTargetCompletionDate!: Date;

  constructor(private dialogRef: MatDialogRef<GoalModalComponent>,
    @Inject(MAT_DIALOG_DATA) goal: Goal,
    public formControlService: FormControlService) {
    this.goal = goal;
  }

  ngOnInit(): void {

    this.minimumTargetCompletionDate = new Date();
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
    this.dialogRef.close()
  }
}