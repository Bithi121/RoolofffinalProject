import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeDetailsService } from 'src/app/Service/employee-details.service';
import { LoginComponent } from 'src/app/login/login/login.component';

@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.css']
})
export class TempComponent {
  // IsValid:any;
  // user: any;
  logout() {
    this._router.navigate(['app-login'])
  }

  register() {
    this._router.navigate(['app-register'])
  }
  @Input() public isValid :any;
  constructor(private _router: Router) {}

  // checkstorage(){
  //   this.user =localStorage.getItem('token');
  //   if(this.user!=null){
  //     this.IsValid =true;
  //   }
  // }

  // logout(){
  //   localStorage.clear();
  //   this.IsValid=false;
  // }
}
