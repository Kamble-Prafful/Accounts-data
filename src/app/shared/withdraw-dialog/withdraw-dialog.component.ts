import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-withdraw-dialog',
  templateUrl: './withdraw-dialog.component.html',
  styleUrls: ['./withdraw-dialog.component.scss'],
})
export class WithdrawDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {}

  ngOnInit(): void {}

  amount!: number;
  acName = this.data.acName;
  acNumber = this.data.acNumber;
}
