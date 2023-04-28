import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { LoginComponent } from './login/login/login.component';
import { AuthGuardService } from './Service/auth-guard.service';
import { TempComponent } from './temp/temp.component';
import { RegisterComponent } from './register/register.component';
import { PSPComponent } from './psp/psp.component';
import { ViewPspComponent } from './psp/view-psp/view-psp.component';
import { OpsManagerComponent } from './ops-manager/ops-manager.component';
import { ViewOpsComponent } from './ops-manager/view-ops/view-ops.component';
import { ViewAccountsRequestComponent } from './view-accounts-request/view-accounts-request.component';
import { PermissionGuard } from './Service/permission.guard';
import { LoginPermissionGuard } from './Service/login-permission.guard';
import { ResetLinkComponent } from './reset-link/reset-link.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent,
    canActivate:[LoginPermissionGuard]
  },
  {
    path:'app-employees',
    component:EmployeesComponent,
    canActivate:[AuthGuardService, PermissionGuard],
    data:{
      role: 'Accounts'
    }

  },
  {
    path:'app-register',
    component:RegisterComponent,
    canActivate:[AuthGuardService, PermissionGuard],
    data:{
      role: 'PSP'
    }
  },
  {
    path:'app-temp',
    component:TempComponent
  },
  {
    path:'app-employees/:id',
    component:ViewEmployeeComponent,
    canActivate:[AuthGuardService, PermissionGuard],
    data:{
      role: ['Accounts']
    }
  },
  {
    path: 'app-reset-link',
    component: ResetLinkComponent,
    canActivate:[LoginPermissionGuard]
  },
  // {
  //   path: 'app-login',
  //   component: LoginComponent
  // },
{
  path:'feedback-form/:id',
    component:FeedbackFormComponent,
    canActivate:[AuthGuardService, PermissionGuard],
    data:{
      role: ['Accounts']
    }
},
{
  path:'app-psp',
    component:PSPComponent,
    canActivate:[AuthGuardService, PermissionGuard],
    data:{
      role: ['PSP']
    }
},
{
  path:'app-view-psp/:id',
  component:ViewPspComponent,
  canActivate:[AuthGuardService, PermissionGuard],
  data:{
    role: ['PSP']
  }
},
{
  path:'app-view-accounts-request/:id',
  component:ViewAccountsRequestComponent,
  canActivate:[AuthGuardService, PermissionGuard],
  data:{
    role: ['Accounts']
  }
},
{
  path:'app-ops-manager',
    component:OpsManagerComponent,
    canActivate:[AuthGuardService, PermissionGuard],
    data:{
      role: ['Admin']
    }
},
{
  path:'app-view-ops/:id',
  component:ViewOpsComponent,
  canActivate:[AuthGuardService, PermissionGuard],
  data:{
    role: ['Admin']
  }
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
