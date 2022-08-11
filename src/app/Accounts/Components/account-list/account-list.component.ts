import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { IAccountDetails } from '../../Interfaces/accountDetails';
import { AcDataServiceService } from '../../Services/ac-data.service';
import { WithdrawDialogComponent } from '../withdraw-dialog/withdraw-dialog.component';
import { DepositDialogComponent } from '../deposit-dialog/deposit-dialog.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
  providers: [DatePipe],
})
export class AccountListComponent implements OnInit {
  constructor(
    private _acDataService: AcDataServiceService,
    private dialogRef: MatDialog,
    private datePipe: DatePipe,
    private navigateRouter: Router
  ) {}

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

  // setPipe() {
  //   this.accountData.forEach((elem) => {
  //     this.datePipe.transform(elem.acDate, 'dd/MM/YYYY');
  //   });
  // }

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
