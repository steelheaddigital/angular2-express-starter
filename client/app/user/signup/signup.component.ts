import { NgForm }    from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../user.service'

@Component({
  selector: 'signup',
  templateUrl: 'signup.component.html',
  providers: [UserService],
})
export class SignupComponent {
  constructor (private userService: UserService) { }
  
  model = new SignupViewModel();
 
  errorMessage: string
  active = true;
  
  signup() {
    this.userService.create(this.model.name, this.model.email, this.model.password)
      .subscribe(
        result => { 
          if(result){
            this.reset();
          }
        },
        error => this.errorMessage = <any>error);
  }

  private reset() {
    this.active = false;
    setTimeout(() => 
      this.active = true, 0);
    this.model = new SignupViewModel();
  }
}

class SignupViewModel {
  name: string
  email: string
  password: string
}