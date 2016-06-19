import { FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BaseFormComponent } from '../../shared/base-form.component';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  providers: [AuthService],
  directives: [FORM_DIRECTIVES]
})
export class LoginComponent extends BaseFormComponent {

  loginForm: ControlGroup;
  email: Control;
  password: Control;

  constructor (private authService: AuthService, private router: Router, private builder: FormBuilder) 
  { 
    super();
    this.buildForm();
  }

  login(): void {
    this.authService.login(this.email.value, this.password.value)
      .subscribe(
        result => {
          if(result.status === 'success'){
            this.router.navigate(['./home']);
          }
        },
        error => {
          super.handleError(this.loginForm, error);
        });
  }

  private buildForm(): void {
    this.email = new Control('', Validators.required);
    this.password = new Control('', Validators.required);
    this.loginForm = this.builder.group({
      email: this.email,
      password: this.password
    });
  }
}