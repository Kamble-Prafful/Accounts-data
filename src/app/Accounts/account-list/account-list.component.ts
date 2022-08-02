import { AcDataServiceService } from './../ac-data.service';
import { Component, OnInit } from '@angular/core';
import { accountDetails } from '../accountDetails';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
})
export default class AccountListComponent implements OnInit {
  constructor(private _acDataService: AcDataServiceService) {}

  accountData: accountDetails[] = [];

  ngOnInit(): void {
    // this._acDataService.acData$.subscribe(
    //   // (acData) => (this.accountData = acData)
    //   (acData) => (this.accountData.push(acData), console.log(this.accountData))
    // );

    //Subscribing to an observable by Get method
    this._acDataService
      .getAccounts()
      .subscribe(
        (acData) => ((this.accountData = acData), console.log(this.accountData))
      );

    console.log(this.accountData);
  }
}
