import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  providers: [AuthService]
})
export class NavbarComponent {
  constructor (private authService: AuthService, private router: Router) { }

  isCollapsed: boolean = true;
  
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  } 
  
  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['./home']);
  }
}