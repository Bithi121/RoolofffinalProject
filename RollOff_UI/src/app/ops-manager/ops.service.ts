import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OpsService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private httpClient: HttpClient) {}

  getRequest(): Observable<any> {
    return this.httpClient.get<any>(this.baseApiUrl + 'Form/OPSFlag');
  }
  getRequestById(employeeid: string): Observable<any> {
    return this.httpClient.get<any>(this.baseApiUrl + 'Form/' + employeeid);
  }

  editRequest(guid: any, request: any): Observable<any> {
    return this.httpClient.put<any>(this.baseApiUrl + 'Form/' + guid, {
      status: request,
    });
  }
  getapprovedRequest(): Observable<any> {
    return this.httpClient.get<any>(this.baseApiUrl + 'Form/OPSFlagApproved');
  }
  getterminatedRequest(): Observable<any> {
    return this.httpClient.get<any>(this.baseApiUrl + 'Form/OPSFlagTerminated');
  }
  // getpendingRequest(): Observable<any> {
  //   return this.httpClient.get<any>(this.baseApiUrl + 'Form/Pending');
  // }
  getonholdRequest(){
    return this.httpClient.get<any>(this.baseApiUrl + 'Form/OnHold');
  }
}
