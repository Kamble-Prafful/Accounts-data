import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from '../Components/account-list/account-list.component';
import { AccountComponent } from '../Components/account/account.component';

const routes: Routes = [
  { path: 'add-account', component: AccountComponent },
  { path: 'add-account/:id', component: AccountComponent },
  { path: 'accounts-store', component: AccountListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsRoutingModule {}
