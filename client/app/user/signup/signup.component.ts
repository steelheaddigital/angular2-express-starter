import { FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service'
import { BaseFormComponent, ValidationResult } from '../../shared/base-form.component';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/take';

@Component({
  selector: 'signup',
  templateUrl: 'signup.component.html',
  providers: [UserService],
})
export class SignupComponent extends BaseFormComponent {

  signupForm: ControlGroup;
  name: Control;
  email: Control;
  password: Control;

  constructor (private userService: UserService, private builder: FormBuilder) {
    super();
    this.buildForm();
  }
  
  signup(): void {
    this.userService.create(this.name.value, this.email.value, this.password.value)
      .subscribe(
        result => {
          if(result){
            //rebuild the form. Seems to be the only way to reset to pristine condition
            this.buildForm();
          }
        },
        error => {
          super.handleError(this.signupForm, error);
        });
  }

  private buildForm(): void {
    this.name = new Control('', Validators.required, this.checkName.bind(this));
    this.email = new Control('', Validators.required, this.checkEmail.bind(this));
    this.password = new Control('', Validators.required);
    this.signupForm = this.builder.group({
      name: this.name,
      email: this.email,
      password: this.password
    });
  }

  private checkName(control: Control): Observable<any> {
    return this.checkUser(control, 'name')
  }

   private checkEmail(control: Control): Observable<any> {
    return this.checkUser(control, 'email')
  }

  private checkUser(control: Control, field: string): Observable<any> {
    //Angular 2 bug causes this to be fired multiple times, once for every keystroke
    //https://github.com/angular/angular/issues/9120
    return new Observable((obs: any) => {
      control
        .valueChanges
        .debounceTime(400)
        .flatMap(value => {
          var queryParams = new Object();
          queryParams[field] = value
          return this.userService.exists(queryParams)
        })
        .subscribe(
          data => {
            if(data === false){
              obs.next(null);
            } else {
              obs.next({'nameTaken': true});
            }
            obs.complete();
          });
    });
  }

}