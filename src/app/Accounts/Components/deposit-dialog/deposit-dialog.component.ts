import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-deposit-dialog',
  templateUrl: './deposit-dialog.component.html',
  styleUrls: ['./deposit-dialog.component.scss'],
})
export class DepositDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  amount!: number;
  acName = this.data.acName;
  acNumber = this.data.acNumber;
}
