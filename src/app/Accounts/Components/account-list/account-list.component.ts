import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { IAccountDetails } from '../../Interfaces/accountDetails';
import { AcDataServiceService } from '../../Services/ac-data.service';
import { TransactionDialogComponent } from 'src/app/shared/transaction-dialog/transaction-dialog.component';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent implements OnInit {
  constructor(
    private _acDataService: AcDataServiceService,
    private dialogRef: MatDialog,
    private navigatingRouter: Router
  ) {}

  displayedColumns: string[] = [
    'action',
    'acName',
    'acNumber',
    'acType',
    'acInterest',
    'acDate',
    'acBalance',
  ];

  popoverTitle: string = 'Account Delete Confirmation';
  popoverMessage: string = 'Are you sure you want to delete this Account?';
  cancelClicked: boolean = false;

  accountData: IAccountDetails[] = [];

  ngOnInit(): void {
    //Refreshing table on OnDelete listener
    this.getAccounts();
  }
  //Getting the data
  getAccounts() {
    this._acDataService
      .getAccounts()
      .subscribe((acData) => (this.accountData = acData));
  }

  //Event Listeners

  onDelete(id: any) {
    this.dialogRef
      .open(DialogComponent)
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this._acDataService.DeleteAccount(id).subscribe(() => {
            this.getAccounts();
          });
        }
      });
  }

  //Transaction Btn
  transactionToggle(id: any) {
    let acNumber: number = 0;
    let acName: string = '';
    this._acDataService.getCurrentAccount(id).subscribe((res) => {
      id = res.id;
      acNumber = res.acNumber;
      acName = res.acName;
      this.dialogRef
        .open(TransactionDialogComponent, {
          data: {
            PostingId: id,
            acNumber: acNumber,
            acName: acName,
          },
        })
        .afterClosed()
        .subscribe();
    });
  }
}
