import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { EmployeeDetailsService } from 'src/app/Service/employee-details.service';
import { ResetPasswordService } from 'src/app/Service/reset-password.service';
import Swal from 'sweetalert2';
import * as EmailValidator from 'email-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  model: any = {};
  responsedata: any;
  Isloggedin = false;
  Role: any = ['Admin', 'Accounts', 'PSP'];

  //isUserValid: boolean | undefined;
  hide = true;
  floatLabelControl = new FormControl('auto' as FloatLabelType);

  constructor(
    private loginAuth: EmployeeDetailsService,
    private _router: Router,
    private emailservice: ResetPasswordService
  ) { }

  loginUser() {
    this.loginAuth.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log(response);
        if (response != null) {
          this.responsedata = response;
          localStorage.setItem('token', this.responsedata.result);
          localStorage.setItem(
            'username',
            JSON.stringify(this.loginForm.value.username)
          );
          localStorage.setItem(
            'role',
            JSON.stringify(this.loginForm.value.department)
          );
          if (this.loginForm.value.department == 'Accounts') {
            // this._router.navigate(["app-employees"])window.location.reload();

            this._router.navigate(['app-employees']);
          } else if (this.loginForm.value.department == 'PSP') {
            this._router.navigate(['app-psp']);
          } else if (this.loginForm.value.department == 'Admin') {
            this._router.navigate(['app-ops-manager']);
          }
        }
        this.Isloggedin = true;
      },
      error: err => {

        if (err.status == 400) {
          Swal.fire({
            icon: 'error',
            title: 'Invalid Details',
            text: 'Username or Password or Role is incorrect!'
          }).then((okay) => {
            if (okay) {
              this._router.navigate(['']);
              this.loginForm.reset();
            }
          })
        }
      }
    });
  }
  ngOnInit(): void { }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
    department: new FormControl(''),
  });

  get Username(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }
  get Password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
  get Department(): FormControl {
    return this.loginForm.get('department') as FormControl;
  }

  changeRole(e: any) {
    console.log(e.target.value);
  }
  public resetPasswordEmail: any;
  public isValidEmail: boolean = false;
  checkValidEmail(event: any) {
    this.isValidEmail = EmailValidator.validate(event.target.value);
    return this.isValidEmail; }
    confirmToSend() {
      console.log(this.resetPasswordEmail);
      this.emailservice.SendforGotPasswordEmail(this.resetPasswordEmail).subscribe((data) =>
      {
        console.log(data.status);
      }, (error) => {
        console.log(error.status);
       })
       this.resetPasswordEmail = "";
       const buttonref = document.getElementById("closebtn");
       buttonref?.click();
      }
}
