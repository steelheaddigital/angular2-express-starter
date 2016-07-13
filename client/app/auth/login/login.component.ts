import { FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BaseFormComponent } from '../../shared/base-form.component';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  providers: [AuthService],
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class LoginComponent extends BaseFormComponent {

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

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
    this.email = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.loginForm = this.builder.group({
      email: this.email,
      password: this.password
    });
  }
}