/* tslint:disable:no-unused-variable */

import { describe, beforeEach, it, expect, addProviders, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('App: Client', () => {
  beforeEach(() => {
    addProviders([AppComponent]);
  });

  it('should create the app',
    inject([AppComponent], (app: AppComponent) => {
      expect(app).toBeTruthy();
    }));
});
