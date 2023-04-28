import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from '../Service/reset-password.service';

@Component({
  selector: 'app-reset-link',
  templateUrl: './reset-link.component.html',
  styleUrls: ['./reset-link.component.css']
})
export class ResetLinkComponent {

  repeatPass: string = 'none';
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  displayMsg: string = '';
  isAccountCreated: boolean = false;
  public emailToReset: any;
  public token: any; hide = true;
  constructor(private authService: ResetPasswordService, private _router: Router, private activatedRoute: ActivatedRoute)
  { }
  ngOnInit(): void
  {
    this.activatedRoute.queryParams.subscribe(val =>
      {
        this.emailToReset = val['email']; this.token = val['code'];
        localStorage.setItem('token', this.token);
        console.log(this.emailToReset);
        console.log(this.token); })
      }
      navigateToFirst()
      {
        this._router.navigate([''])
      }
      registerForm = new FormGroup({
         password: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(15),]),
         rpwd: new FormControl('', [Validators.required]), });
         getFloatLabelValue(): FloatLabelType
         {
          return this.floatLabelControl.value || 'auto';
         }
         public checkpass: boolean = false;
         checkPass(event: any)
         {
          console.log(event.target.value);
          if (this.Password.value == event.target.value)
          {
            this.checkpass = true;
          }
          console.log(this.checkpass);
          return this.checkpass;
        }
        get Password(): FormControl
        {
          return this.registerForm.get("password") as FormControl;
        }
        get RPWD(): FormControl
        {
          return this.registerForm.get("rpwd") as FormControl;
        }
        registerSubmited() {
          console.log(this.emailToReset);
          console.log(this.Password.value);
          this.authService.resetpassword(this.emailToReset,this.Password.value).subscribe(
            (data)=>{
              console.log(data);
            },
            (error)=>{
              console.log(error.status);
            })
            localStorage.clear();
          }}
