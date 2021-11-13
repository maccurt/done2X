import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Goal } from '../goal.service';

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

  constructor(private dialogRef: MatDialogRef<GoalModalComponent>, @Inject(MAT_DIALOG_DATA) goal: Goal) {
    this.goal = goal;
  }

  ngOnInit(): void {

    this.nameControl = new FormControl(this.goal.name, Validators.required);
    this.descriptionControl = new FormControl(this.goal.description, Validators.required);
    this.whatIsDoneControl = new FormControl(this.goal.whatIsDone, Validators.required);

    this.formGroup = new FormGroup({
      name: this.nameControl,
      description: this.descriptionControl,
      whatIsDone: this.whatIsDoneControl
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

  //TODO this is repeated find common place for it
  isInvalid = (control: AbstractControl): boolean => {
    return (control.touched && control.invalid || control.invalid && this.showErrors);    
  }
  
}
