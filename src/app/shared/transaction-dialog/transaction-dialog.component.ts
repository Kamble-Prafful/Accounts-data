// import { WithdrawDialogComponent } from '../../Accounts/Components/withdraw-dialog/withdraw-dialog.component';
// import { IAccountDetails } from '../../Accounts/Interfaces/accountDetails';
// import { AcDataServiceService } from '../../Accounts/Services/ac-data.service';
// import { DepositDialogComponent } from '../../Accounts/Components/deposit-dialog/deposit-dialog.component';
// import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { Component, Inject, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-transaction-dialog',
//   templateUrl: './transaction-dialog.component.html',
//   styleUrls: ['./transaction-dialog.component.scss'],
// })
// export class TransactionDialogComponent implements OnInit {
//   constructor(
//     private dialogRef: MatDialog,
//     @Inject(MAT_DIALOG_DATA) private data: any,
//     private _acDataService: AcDataServiceService
//   ) {}

//   addedAmount!: number;

//   acName = this.data.acName;
//   acNumber = this.data.acNumber;
//   postingId = this.data.PostingId;

//   ngOnInit(): void {}

//   //Deposit Dialog
//   depositDialog() {
//     this.dialogRef
//       .open(DepositDialogComponent, {
//         data: {
//           acName: this.acName,
//           acNumber: this.acNumber,
//         },
//       })
//       .afterClosed()
//       .subscribe((res) => {
//         this.addedAmount = res;
//         this._acDataService
//           .getCurrentAccount(this.postingId)
//           .subscribe((res) => {
//             let updatedAcData: IAccountDetails = {
//               id: res.id,
//               acType: res.acType,
//               acInterest: res.acInterest,
//               acName: res.acName,
//               acNumber: res.acNumber,
//               acBalance: Number(this.addedAmount) + Number(res.acBalance),
//               acDate: res.acDate,
//             };

//             this._acDataService
//               .updateAccount(this.postingId, updatedAcData)
//               .subscribe((res) => {});
//           });
//       });
//   }

//   // Withdraw dialog

//   withdrawDialog() {
//     this.dialogRef
//       .open(WithdrawDialogComponent, {
//         data: {
//           acName: this.acName,
//           acNumber: this.acNumber,
//         },
//       })
//       .afterClosed()
//       .subscribe((res) => {
//         this.addedAmount = res;
//         this._acDataService
//           .getCurrentAccount(this.postingId)
//           .subscribe((res) => {
//             let updatedAcData: IAccountDetails = {
//               id: res.id,
//               acType: res.acType,
//               acInterest: res.acInterest,
//               acName: res.acName,
//               acNumber: res.acNumber,
//               acBalance: res.acBalance - Number(this.addedAmount),
//               acDate: res.acDate,
//             };

//             this._acDataService
//               .updateAccount(this.postingId, updatedAcData)
//               .subscribe((res) => {});
//           });
//       });
//   }
// }
