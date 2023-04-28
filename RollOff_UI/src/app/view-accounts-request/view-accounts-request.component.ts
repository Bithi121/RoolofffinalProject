import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeDetailsService } from '../Service/employee-details.service';

@Component({
  selector: 'app-view-accounts-request',
  templateUrl: './view-accounts-request.component.html',
  styleUrls: ['./view-accounts-request.component.css'],
})
export class ViewAccountsRequestComponent {
  newstatus: any = ['Approved', 'Rejected'];
  employeeId: string | null | undefined;
  role: any;
  request: any = {
    guid: '',
    globalGroupID: 0,
    name: '',
    localGrade: '',
    practice: '',
    communication: '',
    rollOffEndDate: new Date(),
    projectCode: 0,
    projectName: '',
    performanceIssue: '',
    resigned: '',
    primarySkill: '',
    reasonForRollOff: '',
    underProbation: '',
    roleCompetencies: '',
    technicalSkills: '',
    longLeave: '',
    remarks: '',
    thisReleaseNeedBackfillIsBackFilled: '',
    leaveType: '',
    relevantExperienceYrs: 0,
  };

  constructor(
    private readonly requestService: EmployeeDetailsService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.employeeId = params.get('id');
      if (this.employeeId) {
        this.requestService
          .getRequestById(this.employeeId)
          .subscribe((successResponse: any) => {
            this.request = successResponse;
            console.log(this.request);
            console.log(this.request.status);
            if (this.request.status == 'Initiated') {
              this.isbutton = true;
            } else if (this.request.status == 'Pending') {
              this.isbutton = true;
            }
          });
      }
      this.role = localStorage.getItem('role')?.replaceAll('"', '');
      console.log(this.role);
    });
  }

  isbutton: boolean = false;
  changeStatus(guid: any, status: any) {
    this.requestService
      .editRequest(guid, status)
      .subscribe((successResponse: any) => {
        this.request = successResponse;
        alert('Request Is ' + status);
      });
  }
}
