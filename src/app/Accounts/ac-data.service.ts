import { accountDetails } from './accountDetails';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

  postAccounts(data: any): Observable<accountDetails[]> {
    return this.http.post<accountDetails[]>(this.baseUrl, data);
  }
}
