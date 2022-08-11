import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IAccountDetails } from '../Interfaces/accountDetails';

@Injectable({
  providedIn: 'root',
})
export class AcDataServiceService {
  private _AcDataSource = new Subject<any>();

  //Expose subject as an observable
  acData$ = this._AcDataSource.asObservable();

  //Url
  baseUrl = 'http://localhost:3000/accounts';

  constructor(private http: HttpClient) {}

  sendAcData(data: any) {
    this._AcDataSource.next(data);
  }

  getAccounts(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  //Get request for getting single account data
  getCurrentAccount(id: any): Observable<any> {
    let getUrl = 'http://localhost:3000/accounts/' + id;
    return this.http.get<any>(getUrl);
  }

  postAccount(data: any): Observable<IAccountDetails[]> {
    return this.http.post<IAccountDetails[]>(this.baseUrl, data);
  }

  updateAccount(id: any, data: any) {
    console.log('from-service-update', id, data);
    let updateUrl = 'http://localhost:3000/accounts/' + id;
    return this.http.put(updateUrl, data);
  }

  DeleteAccount(id: any): Observable<any> {
    let deleteUrl = 'http://localhost:3000/accounts/' + id;
    return this.http.delete(deleteUrl);
  }
}
