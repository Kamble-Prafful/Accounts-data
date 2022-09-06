import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../../../shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { IAccountDetails } from '../../Interfaces/accountDetails';
import { AcDataServiceService } from '../../Services/ac-data.service';
import { WithdrawDialogComponent } from '../withdraw-dialog/withdraw-dialog.component';
import { DepositDialogComponent } from '../deposit-dialog/deposit-dialog.component';
import {
  CurrencyPipe,
  DatePipe,
  formatDate,
  PercentPipe,
} from '@angular/common';
import { IgxColumnComponent } from 'igniteui-angular';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
  providers: [DatePipe, CurrencyPipe, PercentPipe],
})
export class AccountListComponent implements OnInit {
  constructor(
    private _acDataService: AcDataServiceService,
    private dialogRef: MatDialog,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private navigateRouter: Router,
    private percentPipe: PercentPipe
  ) {}

  onColumnInit(column: IgxColumnComponent) {
    if (column.field === 'acDate') {
      column.formatter = (date) =>
        formatDate(new Date(date), 'dd/MM/YYYY', 'en');
    } else if (column.field === 'acBalance') {
      column.formatter = (balance) =>
        this.currencyPipe.transform(balance, 'INR');
    } else if (column.field === 'acInterest') {
      column.formatter = (interest) =>
        this.percentPipe.transform(interest, '1.1-2');
    }
  }

  ObjectKeys = Object.keys;

  //Account Store data
  accountData: IAccountDetails[] = [];

  //Mat-table configuration
  displayedColumns: Object = {
    action: 'Action',
    acName: 'Name',
    acNumber: 'Ac Number',
    acType: 'Ac Type',
    acInterest: 'Interest',
    acDate: 'DOC',
    acBalance: 'Balance',
  };

  //Variable for DialogBox data
  addedAmount!: number;

  ngOnInit(): void {
    //Refreshing table on OnDelete listener
    this.getAccounts();
  }
  //Getting the data
  getAccounts() {
    this._acDataService
      .getAccounts()
      .subscribe(
        (acData) => ((this.accountData = acData), console.log(this.accountData))
      );
  }

  //Event Listeners

  onEdit(id: any) {
    this.navigateRouter.navigate(['/accounts/add-account/' + id], {
      queryParams: { editMode: true },
    });
  }

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

  //Deposit Dialog
  depositDialog(id: any) {
    this._acDataService.getCurrentAccount(id).subscribe((res) => {
      this.dialogRef
        .open(DepositDialogComponent, {
          data: {
            acName: res.acName,
            acNumber: res.acNumber,
          },
        })
        .afterClosed()
        .subscribe((res) => {
          this.addedAmount = res;
          this._acDataService.getCurrentAccount(id).subscribe((res) => {
            let updatedAcData: IAccountDetails = {
              id: res.id,
              acType: res.acType,
              acInterest: res.acInterest,
              acName: res.acName,
              acNumber: res.acNumber,
              acBalance: Number(this.addedAmount) + Number(res.acBalance),
              acDate: res.acDate,
            };

            this._acDataService
              .updateAccount(id, updatedAcData)
              .subscribe(() => {
                this.getAccounts();
              });
          });
        });
    });
  }

  //Withdraw Dialog
  withdrawDialog(id: any) {
    this._acDataService.getCurrentAccount(id).subscribe((res) => {
      this.dialogRef
        .open(WithdrawDialogComponent, {
          data: {
            acName: res.acName,
            acNumber: res.acNumber,
          },
        })
        .afterClosed()
        .subscribe((res) => {
          this.addedAmount = res;
          this._acDataService.getCurrentAccount(id).subscribe((res) => {
            let updatedAcData: IAccountDetails = {
              id: res.id,
              acType: res.acType,
              acInterest: res.acInterest,
              acName: res.acName,
              acNumber: res.acNumber,
              acBalance: res.acBalance - Number(this.addedAmount),
              acDate: res.acDate,
            };

            this._acDataService
              .updateAccount(id, updatedAcData)
              .subscribe(() => {
                this.getAccounts();
              });
          });
        });
    });
  }
}
