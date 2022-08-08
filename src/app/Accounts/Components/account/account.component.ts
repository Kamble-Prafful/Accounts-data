import { IAccountDetails } from '../../Interfaces/accountDetails';
import { DialogComponent } from '../../../shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AcDataServiceService } from '../../Services/ac-data.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  //Add or Update ngIf variable
  addForm: boolean = true;

  // Generating Account Number
  acNumber!: number;

  //Object for Update form
  accountDetails: IAccountDetails = {
    id: 0,
    acType: '',
    acInterest: 0,
    acName: '',
    acNumber: this.acNumber,
    acBalance: 0,
    acDate: new Date(),
  };

  //Toast Success Message
  acDataPost: boolean = false;

  constructor(
    private _acDataService: AcDataServiceService,
    private navigateRouter: Router,
    private dialogRef: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Generating Account Number
    this.acNumber = Math.round(Math.random() * 10000000000);

    //Toggling add or update form using QueryParams
    this.activatedRoute.queryParamMap.subscribe((res) => {
      this.addForm = !!!res.get('editMode'); // Converting to boolean by using !!
    });

    //Getting CurrentAccount for Updating request
    if (!this.addForm) {
      //Update configuration
      this._acDataService
        .getCurrentAccount(this.activatedRoute.snapshot.params['id'])
        .subscribe((acData) => {
          this.accountDetails = acData;
        });
    }
  }

  // EventListener: Add or Update Button submit
  onSubmit(formData: NgForm) {
    if (this.addForm) {
      // Assigning userData to variables
      let acName = formData.value.name;
      let acInterest = Number(formData.value.interest) / 100;
      let acType: string = formData.value.type;
      let acBalance = formData.value.balance;

      this.accountDetails = formData.value;

      //Passable Object
      let accountData = {
        acType: acType,
        acInterest: acInterest,
        acName: acName,
        acNumber: this.acNumber,
        acDate: new Date(),
        acBalance: acBalance,
        id: 0,
      };

      //Opening Modal for Posting Data
      this.dialogRef
        .open(DialogComponent)
        .afterClosed()
        .subscribe((res) => {
          if (res) {
            //Posting Ac Data
            this._acDataService.postAccount(accountData).subscribe(() => {
              this.acDataPost = true;
              //Navigating back to the accounts store
              this.navigateRouter.navigate(['accounts/accounts-store']);
              formData.reset();
            });
          }
        });
    } else if (!this.addForm) {
      //Updated FormData
      let updatedFormData = {
        acBalance: this.accountDetails.acBalance,
        acInterest: Number(formData.value.interest) / 100,
        acType: formData.value.type,
        acNumber: this.accountDetails.acNumber,
        acName: formData.value.name,
        acDate: this.accountDetails.acDate,
      };

      this.dialogRef
        .open(DialogComponent)
        .afterClosed()
        .subscribe((res) => {
          if (res) {
            this._acDataService
              .updateAccount(
                this.activatedRoute.snapshot.params['id'],
                updatedFormData
              )
              .subscribe(() => {
                this.router.navigate(['/accounts/accounts-store']);
              });
          }
        });
    }
  }
}
