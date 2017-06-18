import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { routing, APP_ROUTER_PROVIDERS } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS } from 'angular2-jwt';
import { HttpModule, Http } from '@angular/http';
import { NavbarComponent } from './shared/navbar';
import { HomeComponent } from './home';
import { SignupComponent } from './user/signup';
import { LoginComponent } from './auth/login';
import { UserService } from './user/user.service';
import { CollapseModule } from 'ngx-bootstrap';

@NgModule({
    declarations: [
      AppComponent, 
      NavbarComponent,
      HomeComponent,
      SignupComponent,
      LoginComponent
    ],
    imports:      [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        CollapseModule.forRoot(),
        routing
    ],
    providers: [
        APP_ROUTER_PROVIDERS,
        { provide: AuthHttp, 
          useFactory: authHttp,
          deps: [Http]
        },
        UserService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
export function authHttp(http: Http) {
    let config: AuthConfig = new AuthConfig({
        headerName: 'Authorization',
        headerPrefix: 'Bearer',
        tokenName: 'auth_token',
        tokenGetter: (() => localStorage.getItem(this.tokenName)),
        noJwtError: false,
        noTokenScheme: false,
    });
    return new AuthHttp(config, http);
}