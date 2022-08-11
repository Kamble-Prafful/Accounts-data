import { MatDialogModule } from '@angular/material/dialog';
import { AccountsRoutingModule } from './../Accounts/Modules/accounts-routing.module';
import { AppRoutingModule } from './../app-routing.module';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
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
  exports: [],
})
export class SharedModule {}
