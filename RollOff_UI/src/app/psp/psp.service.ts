import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PspService {
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private httpClient: HttpClient) {}

  getRequest(username: any, role: any): Observable<any> {
    return this.httpClient.get<any>(
      this.baseApiUrl + 'Form/Request/' + username + '?role=' + role
    );
  }
  getRequestById(employeeid: string): Observable<any> {
    return this.httpClient.get<any>(this.baseApiUrl + 'Form/' + employeeid);
  }

  editRequest(guid: any, request: any): Observable<any> {
    return this.httpClient.put<any>(this.baseApiUrl + 'Form/' + guid, {
      status: request,
    });
  }
  getapprovedRequestBypsp(username: any): Observable<any> {
    return this.httpClient.get<any>(
      this.baseApiUrl + 'Form/ApprovedByPSP/' + username
    );
  }
  getterminatedRequestBypsp(username: any): Observable<any> {
    return this.httpClient.get<any>(
      this.baseApiUrl + 'Form/TerminatedByPSP/' + username
    );
  }
  getonholdRequestBypsp(username: any) {
    return this.httpClient.get<any>(
      this.baseApiUrl + 'Form/OnHoldByPSP/' + username
    );
  }
  getInitiatedRequestBypsp(username: any): Observable<any> {
    return this.httpClient.get<any>(
      this.baseApiUrl + 'Form/InitiatedByPSP/' + username
    );
  }
}
