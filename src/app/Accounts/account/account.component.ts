import { AcDataServiceService } from './../ac-data.service';

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { accountDetails } from '../accountDetails';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  acName = '';
  acInterest: number | undefined;
  acType = '';
  acNumber!: number;
  acBalance!: number;
  currDate: Date = new Date();

  constructor(private _acDataService: AcDataServiceService) {}

  ngOnInit(): void {
    let random = Math.round(Math.random() * 10000000000);
    this.acNumber = random;
  }

  onSubmit(formData: NgForm) {
    console.log(formData);
    this.acName = formData.value.name;
    this.acInterest = Number(formData.value.interest) / 100;
    this.acType = formData.value.type;
    this.acBalance = formData.value.balance;

    // let accountData: accountDetails[] = [
    //   {
    //     acType: this.acType,
    //     acInterest: this.acInterest,
    //     acName: this.acName,
    //     acNumber: this.acNumber,
    //     acDate: this.currDate,
    //     acBalance: this.acBalance,
    //   },
    // ];

    let formattedDate = formatDate(this.currDate, 'dd-MM-yyyy', 'en_US');
    console.log(formattedDate);

    let accountData: any = {
      acType: this.acType,
      acInterest: this.acInterest,
      acName: this.acName,
      acNumber: this.acNumber,
      acDate: formattedDate,
      acBalance: this.acBalance,
    };

    //Service Configuration
    this._acDataService.sendAcData(accountData);

    this._acDataService.postAccounts(accountData).subscribe((error) => {
      console.log(error);
    });

    formData.reset();
  }
}
