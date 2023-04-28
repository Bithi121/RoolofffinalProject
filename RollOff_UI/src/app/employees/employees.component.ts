import { Component,OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';
import { Form } from '../Models/Form.models';
import { Employee } from '../Models/ui-models/Employee.models';
import { PspService } from '../psp/psp.service';
import{ EmployeeDetailsService} from '../Service/employee-details.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees:Employee[]=[];
  formdata: Form[]=[];
  displayedColumns: string[] = ['globalGroupId','employeeNo','name','localGrade','email','edit'];
  displayedColumns2: string[] = ['globalGroupId','name','projectName','requestDate','rollOffEndDate','status', 'edit'];
  dataSource:MatTableDataSource<Employee>=new MatTableDataSource<Employee>();
  dataSource2:MatTableDataSource<Form>=new MatTableDataSource<Form>();
  @ViewChild(MatPaginator) matPaginator!:MatPaginator;
  @ViewChild(MatPaginator) matPaginator2!:MatPaginator;
  filterString='';
  total: any = 0;
  Approved: any = 0;
  Terminated: any = 0;
  Initiated: any = 0;
  OnHold: any = 0;
  hidden: any;

  constructor(private employeeDetailsService: EmployeeDetailsService){}

  ngOnInit(): void {
    //fetch employees
    this.employeeDetailsService.getEmployee(localStorage.getItem('username')?.replaceAll('"','')).subscribe((successResponse)=>{
      this.employees=successResponse;
      this.dataSource=new MatTableDataSource<Employee>(this.employees);
      //window.location.reload();

      if(this.matPaginator){
        this.dataSource.paginator=this.matPaginator;
      }
    },
    (errorResponse)=>{
      console.log(errorResponse);

    }
    );
    this.GetTotal();
     this.forRequest();
  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  filterEmployees(){
    this.dataSource.filter=this.filterString.trim().toLowerCase();
    this.dataSource2.filter=this.filterString.trim().toLowerCase();
  }

  forRequest(){

    this.GetApproved();
      this.GetTerminated();
      this.GetInitiated();
      this.GetOnHold();
  

  }
  getColor(status:any) { (2)
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
    this.employeeDetailsService.getRequest(localStorage.getItem('username')?.replaceAll('"',''), localStorage.getItem('role')?.replaceAll('"','')).subscribe(
      (successResponse) => {
        this.formdata = successResponse;
        this.total = this.formdata.length;
        this.dataSource2 = new MatTableDataSource<any>(this.formdata);
        if (this.matPaginator2) {
          this.dataSource2.paginator = this.matPaginator2;
        }
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }
  GetApproved() {
    this.hidden = !this.hidden;
    this.employeeDetailsService.getapprovedRequest(localStorage.getItem('username')?.replaceAll('"','')).subscribe(
      (successResponse) => {
        this.formdata = successResponse;
        this.Approved = this.formdata.length;
        this.dataSource2 = new MatTableDataSource<any>(this.formdata);
        if (this.matPaginator2) {
          this.dataSource2.paginator = this.matPaginator2;
        }
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }
  GetOnHold() {
    this.hidden = !this.hidden;
    this.employeeDetailsService.getonholdRequest(localStorage.getItem('username')?.replaceAll('"','')).subscribe(
      (successResponse) => {
        this.formdata = successResponse;
        this.OnHold = this.formdata.length;
        this.dataSource2 = new MatTableDataSource<any>(this.formdata);
        if (this.matPaginator2) {
          this.dataSource2.paginator = this.matPaginator2;
        }
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }
  GetTerminated() {
    this.hidden = !this.hidden;
    this.employeeDetailsService.getterminatedRequest(localStorage.getItem('username')?.replaceAll('"','')).subscribe(
      (successResponse) => {
        this.formdata = successResponse;
        this.Terminated = this.formdata.length;
        this.dataSource2 = new MatTableDataSource<any>(this.formdata);
        if (this.matPaginator2) {
          this.dataSource2.paginator = this.matPaginator2;
        }
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }

  GetInitiated() {
    this.hidden = !this.hidden;
    this.employeeDetailsService.getInitiatedRequest(localStorage.getItem('username')?.replaceAll('"','')).subscribe(
      (successResponse) => {
        this.formdata = successResponse;
        this.Initiated = this.formdata.length;
        this.dataSource2 = new MatTableDataSource<any>(this.formdata);
        if (this.matPaginator2) {
          this.dataSource2.paginator = this.matPaginator2;
        }
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }

}


