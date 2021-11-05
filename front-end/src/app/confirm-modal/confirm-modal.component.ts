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
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.less']
})
export class ConfirmModalComponent implements OnInit {

  confirm: Confirm;

  constructor(private dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Confirm
  ) {
    this.confirm = data;
  }

  ngOnInit() {
  }

  no = () => {
    this.dialogRef.close(false);
  }

  yes = () => {
    this.dialogRef.close(true);
  }

}