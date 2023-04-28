import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PspService } from './psp.service';
import { Employee } from '../Models/ui-models/Employee.models';
import { Router } from '@angular/router';
import { Form } from '../Models/Form.models';

@Component({
  selector: 'app-psp',
  templateUrl: './psp.component.html',
  styleUrls: ['./psp.component.css'],
})
export class PSPComponent implements OnInit {
  hidden = false;
  total: any = 0;
  Approved: any = 0;
  Terminated: any = 0;
  OnHold: any = 0;
  Initiated: any = 0;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  requests: any[] = [];
  displayedColumns: string[] = [
    'globalGroupId',
    'name',
    'projectName',
    'requestDate',
    'rollOffEndDate',
    'status',
    'edit',
  ];
  dataSource: MatTableDataSource<Form> = new MatTableDataSource<Form>();

  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  filterString = '';

  constructor(private pspService: PspService, private router: Router) {}
// ngDoCheck(){
//   this.GetTotal();
// }
  ngOnInit(): void {
    this.GetTotal();
    this.forRequest();
  }
  forRequest() {
    this.GetApproved();
    this.GetTerminated();
    this.GetInitiated();
    this.GetOnHold();

  }
  filterEmployees() {
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }

  getColor(status: any) {
    2;
    switch (status) {
      case 'Pending':
        return '#FFC107';
      case 'Approved':
        return '#37f246';
      case 'Terminated':
        return 'red';
    }
    return '#FFC107';
  }
  GetTotal() {
    this.pspService
      .getRequest(
        localStorage.getItem('username')?.replaceAll('"', ''),
        localStorage.getItem('role')?.replaceAll('"', '')
      )
      .subscribe(
        (successResponse) => {
          this.requests = successResponse;
          this.total = this.requests.length;
          this.dataSource = new MatTableDataSource<any>(this.requests);
          if (this.matPaginator) {
            this.dataSource.paginator = this.matPaginator;
          }
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      );
      }
  GetInitiated() {
    this.hidden = !this.hidden;
    this.pspService
      .getInitiatedRequestBypsp(
        localStorage.getItem('username')?.replaceAll('"', '')
      )
      .subscribe(
        (successResponse) => {
          this.requests = successResponse;
          this.Initiated = this.requests.length;
          this.dataSource = new MatTableDataSource<any>(this.requests);
          if (this.matPaginator) {
            this.dataSource.paginator = this.matPaginator;
          }
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      );
  }
  GetOnHold() {
    this.hidden = !this.hidden;
    this.pspService
      .getonholdRequestBypsp(
        localStorage.getItem('username')?.replaceAll('"', '')
      )
      .subscribe(
        (successResponse) => {
          this.requests = successResponse;
          this.OnHold = this.requests.length;
          this.dataSource = new MatTableDataSource<any>(this.requests);
          if (this.matPaginator) {
            this.dataSource.paginator = this.matPaginator;
          }
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      );
  }
  GetApproved() {
    this.hidden = !this.hidden;
    this.pspService
      .getapprovedRequestBypsp(
        localStorage.getItem('username')?.replaceAll('"', '')
      )
      .subscribe(
        (successResponse) => {
          this.requests = successResponse;
          this.Approved = this.requests.length;
          this.dataSource = new MatTableDataSource<any>(this.requests);
          if (this.matPaginator) {
            this.dataSource.paginator = this.matPaginator;
          }
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      );
  }
  GetTerminated() {
    this.hidden = !this.hidden;
    this.pspService
      .getterminatedRequestBypsp(
        localStorage.getItem('username')?.replaceAll('"', '')
      )
      .subscribe(
        (successResponse) => {
          this.requests = successResponse;
          this.Terminated = this.requests.length;
          this.dataSource = new MatTableDataSource<any>(this.requests);
          if (this.matPaginator) {
            this.dataSource.paginator = this.matPaginator;
          }
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      );
  }
}
