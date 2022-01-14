import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export class Confirm {
  title?: string;
  question!: string;
  yesAnswer!: string;
  noAnswer!: string;
  nameOfEntity?: string;
}

@Component({
  selector: 'd2x-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {
  confirm: Confirm;
  constructor(private dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Confirm
  ) {
    this.confirm = data;
  }

  no = () => {
    this.dialogRef.close(false);
  }

  yes = () => {
    this.dialogRef.close(true);
  }
}