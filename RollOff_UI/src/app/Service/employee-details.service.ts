import { Injectable, reflectComponentType } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
//import{GetAllEmployeeResponse} from '../Models/api-models/getallstudentresponse.models'
import { Employee } from '../Models/api-models/Employee.models';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EmployeeDetailsService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);

  public isLoggedIn$ = this.isLoggedIn.asObservable();
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private httpClient: HttpClient) {}

  getEmployee(username: any): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(
      this.baseApiUrl + 'EmployeeByAccounts/' + username
    );
  }

  getEmployeebyid(employeeid: string): Observable<Employee> {
    return this.httpClient.get<Employee>(
      this.baseApiUrl + 'Employees/' + employeeid
    );
  }
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
  getrolledoffemployees(){
    return this.httpClient.get<any>(this.baseApiUrl + 'Joins');
  }

  saveFormData(data: any) {
    console.log(data);
    return this.httpClient.post(this.baseApiUrl + 'Form', data);
  }

  registerUser(user: any) {
    return this.httpClient.post(
      this.baseApiUrl + 'api/Register',
      {
        Username: user[0],
        Email: user[1],
        Password: user[2],
        Department: user[3],
      },
      {
        responseType: 'text',
      }
    );
  }
  login(model: any) {
    return this.httpClient.post(this.baseApiUrl + 'api/Auth/Login', model);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getapprovedRequest(username: any): Observable<any> {
    return this.httpClient.get<any>(
      this.baseApiUrl + 'Form/Approved/' + username
    );
  }
  getterminatedRequest(username: any): Observable<any> {
    return this.httpClient.get<any>(
      this.baseApiUrl + 'Form/Terminated/' + username
    );
  }
  getInitiatedRequest(username: any): Observable<any> {
    return this.httpClient.get<any>(
      this.baseApiUrl + 'Form/Initiated/' + username
    );
  }
  getonholdRequest(username: any) {
    return this.httpClient.get<any>(
      this.baseApiUrl + 'Form/OnHold/' + username
    );
  }

  sendEmail(email:any){
    return this.httpClient.post<any>(
      this.baseApiUrl + 'api/Email', email
    )
  }


}
