import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AccountsRoutingModule } from './../Accounts/Modules/accounts-routing.module';
import { AppRoutingModule } from './../app-routing.module';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DepositDialogComponent } from './deposit-dialog/deposit-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { WithdrawDialogComponent } from './withdraw-dialog/withdraw-dialog.component';

@NgModule({
  declarations: [DepositDialogComponent, WithdrawDialogComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    AppRoutingModule,
    AccountsRoutingModule,
    MatDialogModule,
    HttpClientModule,
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    DepositDialogComponent,
  ],
})
export class SharedModule {}
