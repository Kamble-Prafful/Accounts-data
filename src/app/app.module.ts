import { AccountsModule } from './Accounts/Modules/accounts.module';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './shared/dialog/dialog.component';
import {
  NoopAnimationsModule,
  BrowserAnimationsModule,
} from '@angular/platform-browser/animations';
import { IgxGridModule } from 'igniteui-angular';

@NgModule({
  declarations: [DialogComponent, AppComponent],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    NoopAnimationsModule,
    MatButtonModule,
    BrowserAnimationsModule,
    IgxGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
