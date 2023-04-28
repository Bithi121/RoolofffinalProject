import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl,} from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EmployeeDetailsService } from '../Service/employee-details.service';


@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent {
minDate: any = new Date;
status: string='';
opsflag: string='';
  constructor(private employeeService:EmployeeDetailsService,
    private readonly route:ActivatedRoute,
    private _router: Router){}
  sentby:any = localStorage.getItem('username')?.replaceAll('"','');
  employeeId:string|null|undefined;
  employee:any={
     globalGroupId:0,
     name: '',
     localGrade: '',
     mainClient: '',
     email: '',
     joiningDate:new Date,
      projectCode:0 ,
      projectName: '',
      projectStartDate:new Date,
      projectEndDate: new Date,
      peopleManager: '',
      practice: '',
      pspName: '',
      newGlobalPractice: '',
      officeCity: '',
      country: ''
      }



  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params)=>{
        this.employeeId=params.get('id');
        if(this.employeeId){
          this.employeeService.getEmployeebyid(this.employeeId)
          .subscribe(
            (successResponse)=>{
              this.employee=successResponse;
              console.log(this.employee)
              this.addForms.controls.globalGroupId.setValue(this.employee.globalGroupId);
              this.addForms.controls.localGrade.setValue(this.employee.localGrade);
              this.addForms.controls.name.setValue(this.employee.name);
              this.addForms.controls.practice.setValue(this.employee.practice);
              this.addForms.controls.projectCode.setValue(this.employee.projectCode);
              this.addForms.controls.projectName.setValue(this.employee.projectName);
              this.addForms.controls.employeeNo.setValue(this.employee.employeeNo);
              this.addForms.controls.sentBy.setValue(this.sentby);
              this.addForms.controls.sentTo.setValue(this.employee.pspName);
            }
          );
        }
      }
    );
  }

  addForms = new FormGroup({
    globalGroupId : new FormControl(0),
    employeeNo: new FormControl(0),
    name : new FormControl(''),
    practice : new FormControl(''),
    performanceIssue : new FormControl(''),
    technicalSkills : new FormControl(''),
    localGrade : new FormControl(''),
    rollOffEndDate : new FormControl(''),
    resigned : new FormControl(''),
    communication : new FormControl(''),
    primarySkill : new FormControl(''),
    reasonForRollOff : new FormControl(''),
    underProbation : new FormControl(''),
    roleCompetencies : new FormControl(''),
    projectCode : new FormControl(0),
    longLeave : new FormControl(''),
    remarks : new FormControl(''),
    projectName : new FormControl(''),
    thisReleaseNeedBackfillIsBackFilled : new FormControl(''),
    relevantExperienceYrs : new FormControl(0),
    leaveType : new FormControl(''),
    otherReasons : new FormControl(''),
    labour: new FormControl(''),
    status: new FormControl(''),
    opsFlag: new FormControl(''),
    sentBy: new FormControl(''),
    sentTo: new FormControl('')
  }
 );

  get GGID(){
    return this.addForms.get('globalGroupId') as FormControl;
  }

onChange(value: any){
  console.log(value);

}
getDates(e:any){
  let date = e.target.value;
  console.log(date);
   let diff=30;
   let todate:any=new Date;
    todate = todate.setDate(this.minDate.getDate()+diff);
    if (formatDate(date,'yyyy-MM-dd','en_US') > formatDate(todate,'yyyy-MM-dd','en_US'))
     {
        console.log('true');
        this.status = 'Initiated';
        this.opsflag = '0';
    } else
    {
     console.log('false');
     this.status = 'On Hold';
     this.opsflag = '1';
     Swal.fire({
      icon:'warning',
      title: 'Roll Off End Date is less than 30 days',
      text: 'Form will be sent to operations manager for approval.'
     })
   }
   this.addForms.controls.status.setValue(this.status);
   this.addForms.controls.opsFlag.setValue(this.opsflag);

 }

  SaveData(){

    console.log(this.addForms.value);
    this.employeeService.saveFormData(this.addForms.value).subscribe((result)=>{
      console.log(result);
      Swal.fire({
        icon:'success',
        title: 'Roll Off Initiated',
        text: 'Roll Off form has been submitted'
      }).then((okay)=>{
        if(okay){
          this.employeeService.sendEmail({
            to: 'amruta-milind.kulkarni@capgemini.com',
            subject: 'New Roll Off Request',
            body:''
          }).subscribe(result=>console.log(result))
        }
      })
      this._router.navigate(['app-employees'])
    });
  }
}


