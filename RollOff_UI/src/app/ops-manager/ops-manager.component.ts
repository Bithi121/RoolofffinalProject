import { Component, ViewChild } from '@angular/core';
import { Form } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PspService } from '../psp/psp.service';
import { OpsService } from './ops.service';

@Component({
  selector: 'app-ops-manager',
  templateUrl: './ops-manager.component.html',
  styleUrls: ['./ops-manager.component.css']
})
export class OpsManagerComponent {
  hidden = false;
  total: any = 0;
  Approved: any = 0;
  Terminated: any = 0;
  OnHold: any = 0;

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
    'edit'
  ];
  dataSource: MatTableDataSource<Form> = new MatTableDataSource<Form>();

  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  filterString = '';

  constructor(private opsService: OpsService, private router: Router) {}

  ngOnInit(): void {
    //fetch employees
    // this.pspService.getRequest().subscribe(
    //   (successResponse) => {
    //     console.log(successResponse);
    //     this.requests = successResponse;
    //     this.dataSource = new MatTableDataSource<Form>(this.requests);

    //     if (this.matPaginator) {
    //       this.dataSource.paginator = this.matPaginator;
    //     }
    //   },
    //   (errorResponse) => {
    //     console.log(errorResponse);
    //   }
    // );
    this.GetApproved();
    this.GetTerminated();
    this.GetTotal();
    this.GetOnHold();
  }

  filterEmployees() {
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }
  newChange() {
    //this.router.navigate(['app-view-psp']);
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
    this.opsService.getRequest().subscribe(
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
  GetApproved() {
    this.hidden = !this.hidden;
    this.opsService.getapprovedRequest().subscribe(
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
    this.opsService.getterminatedRequest().subscribe(
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
  GetOnHold() {
    this.hidden = !this.hidden;
    this.opsService.getonholdRequest().subscribe(
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
  // GetPending() {
  //   this.hidden = !this.hidden;
  //   this.opsService.getpendingRequest().subscribe(
  //     (successResponse) => {
  //       this.requests = successResponse;
  //       this.Pending = this.requests.length;
  //       this.dataSource = new MatTableDataSource<any>(this.requests);
  //       if (this.matPaginator) {
  //         this.dataSource.paginator = this.matPaginator;
  //       }
  //     },
  //     (errorResponse) => {
  //       console.log(errorResponse);
  //     }
  //   );
  // }
}
