import { Component, OnInit } from '@angular/core';
import { EmployeeDetailsService } from 'src/app/Service/employee-details.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
})
export class TopNavComponent implements OnInit {
  user: any;
  Isloggedin: boolean = false;
  username: any;
  role: any;
  text: any;
  constructor() {}

  ngOnInit(): void {
    //this.checkstorage();
  }
  ngDoCheck() {
    this.checkstorage();
    this.username =
      'Welcome, ' + localStorage.getItem('username')?.replaceAll('"', '');
    this.role =
      'You are loggedin as ' +
      localStorage.getItem('role')?.replaceAll('"', '');
  }
  checkstorage() {
    this.user = localStorage.getItem('token');
    if (this.user != null) {
      this.Isloggedin = true;
    }
  }
  logout() {
    localStorage.clear();
    this.Isloggedin = false;
    console.log(this.Isloggedin);
  }
}
