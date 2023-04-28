import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/Models/ui-models/Employee.models';
import { Form } from '../Models/Form.models';
import { EmployeeDetailsService } from '../Service/employee-details.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css'],
})
export class ViewEmployeeComponent implements OnInit {
  rolledOff:any = {
    length: 0
  };
  
  flag:boolean=false;
  startDate: any = new Date();
  employeeId: string | null | undefined;
  employee: Employee = {
    globalGroupId: 0,
    employeeNo: 0,
    name: '',
    localGrade: '',
    mainClient: '',
    email: '',
    joiningDate: new Date(),
    projectCode: 0,
    projectName: '',
    projectStartDate: new Date(),
    projectEndDate: new Date(),
    peopleManager: '',
    practice: '',
    pspName: '',
    newGlobalPractice: '',
    officeCity: '',
    country: '',
  };

  constructor(
    private readonly employeeservice: EmployeeDetailsService,
    private readonly route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.employeeservice.getrolledoffemployees().subscribe(res=>{
      this.rolledOff=res;
      console.log(this.rolledOff);
    })
    this.route.paramMap.subscribe((params) => {
      this.employeeId = params.get('id');
      if (this.employeeId) {
        this.employeeservice
          .getEmployeebyid(this.employeeId)
          .subscribe((successResponse) => {
            this.employee = successResponse;
            // this.func();
            console.log(this.flag)
          });
      }
    });
  }

  ngDoCheck(){
    this.func();
  }
  func(){
    for (let index = 0; index < this.rolledOff.length; index++) {
      const element = this.rolledOff[index];
      if(element.globalGroupId==this.employee.globalGroupId){
        this.flag=true;
      }
    }
  }


  validateDate() {
    this.startDate = this.employee.projectStartDate;
    console.log(this.startDate);
    let todayDate: any = new Date();
    let diff = 183;
    let newDate = todayDate.setDate(todayDate.getDate() - diff);
    if (
      formatDate(todayDate, 'yyyy-MM-dd', 'en_US') <
      formatDate(this.startDate, 'yyyy-MM-dd', 'en_US')
    ) {
      alert(
        'Employee has not worked for at least 6 months!!....Please Justify'
      );
    } else {
      console.log('true');
    }
  }
}
