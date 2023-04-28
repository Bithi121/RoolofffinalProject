import { createMayBeForwardRefExpression } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { EmployeeDetailsService } from '../Service/employee-details.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  Role: any = ['Admin', 'Accounts', 'PSP'];
  repeatPass: string = 'none';
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  displayMsg: string = '';
  isAccountCreated: boolean = false;
  hide = true;

  constructor(
    private authService: EmployeeDetailsService,
    private _router: Router
  ) {}
  ngOnInit(): void {}
  navigateToFirst() {
    this._router.navigate(['']);
  }
  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z].*'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
    department: new FormControl(''),
    rpwd: new FormControl(''),
  });

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  get UserName(): FormControl {
    return this.registerForm.get('username') as FormControl;
  }
  get Email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }
  get Password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }
  get RPWD(): FormControl {
    return this.registerForm.get('rpwd') as FormControl;
  }
  get Department(): FormControl {
    return this.registerForm.get('department') as FormControl;
  }

  registerSubmited() {

    if (this.Password.value == this.RPWD.value) {
      console.log(this.registerForm.valid);
      this.repeatPass = 'none';
      console.log(this.registerForm.value);
      this.authService
        .registerUser([
          this.registerForm.value.username,
          this.registerForm.value.email,
          this.registerForm.value.password,
          this.registerForm.value.department,
        ])
        .subscribe((res) => {
          if (res == 'Success') {
            alert('Account created successfully');
            this.isAccountCreated = true;
            this._router.navigate(['']);
          } else if (res == 'Already Exists') {
            alert('Account Already Exist. Try another user');
            this.isAccountCreated == false;
          } else {
            alert('Something went wrong');
            this.isAccountCreated = false;
          }
          console.log(res);
        });
    } else {
      this.repeatPass = 'inline';
    }
  }
}
