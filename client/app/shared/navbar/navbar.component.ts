import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { CollapseDirective } from 'ng2-bootstrap';
import { AuthService } from '../../auth/auth.service'

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  providers: [AuthService],
  directives: [ROUTER_DIRECTIVES, CollapseDirective]
})
export class NavbarComponent {
  constructor (private authService: AuthService, private router: Router) { }

  isCollapsed: boolean = true;
  
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  } 
  
  logout(event) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['./home']);
  }
}