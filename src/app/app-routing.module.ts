import { AccountComponent } from './Accounts/account/account.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import AccountListComponent from './Accounts/account-list/account-list.component';

const routes: Routes = [
  { path: 'add-account', component: AccountComponent },
  { path: 'account-list', component: AccountListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
