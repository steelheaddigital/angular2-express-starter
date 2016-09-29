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
import { CollapseModule } from 'ng2-bootstrap';

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
        CollapseModule,
        routing
    ],
    providers: [
        APP_ROUTER_PROVIDERS,
        { provide: AuthHttp, 
          useFactory: (http) => {
          return new AuthHttp(new AuthConfig({
              headerName: 'Authorization',
              headerPrefix: 'Bearer',
              tokenName: 'auth_token',
              tokenGetter: (() => localStorage.getItem(this.tokenName)),
              noJwtError: false,
              noTokenScheme: false
          }), http);
          },
          deps: [Http]
        }
    ],
    bootstrap:    [AppComponent],
})
export class AppModule {}