import { TableWrapperComponent } from './../../core/table-wrapper/table-wrapper.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AccountComponent } from '../Components/account/account.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AccountListComponent } from '../Components/account-list/account-list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DepositDialogComponent } from '../Components/deposit-dialog/deposit-dialog.component';
import { WithdrawDialogComponent } from '../Components/withdraw-dialog/withdraw-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AccountComponent,
    AccountListComponent,
    DepositDialogComponent,
    WithdrawDialogComponent,
    TableWrapperComponent,
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    MatGridListModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
  ],

  exports: [MatButtonModule],
})
export class AccountsModule {}
