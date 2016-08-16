import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { NavbarComponent } from './shared/navbar/index';

@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    viewProviders: [HTTP_PROVIDERS],
    directives: [ROUTER_DIRECTIVES, NavbarComponent],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent { }
