import { NgForm }    from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  providers: [AuthService],
})
export class LoginComponent {
  constructor (private authService: AuthService, private router: Router) { }

  model = new LoginViewModel();

  errorMessage: string
  active = true;

  login() {
    this.authService.login(this.model.email, this.model.password)
      .subscribe(
        result => {
          console.log(result)
          if(result){
            this.router.navigate(['./home']);
          }
        },
        error => this.errorMessage = <any>error);
  }

  private reset() {
    this.active = false;
    setTimeout(() => 
      this.active = true, 0);
    this.model = new LoginViewModel();
  }
}

class LoginViewModel {
  email: string
  password: string
}