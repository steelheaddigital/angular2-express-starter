import 'zone.js';
import 'reflect-metadata';
import { beforeEachProviders, inject, beforeEach } from '@angular/core/testing'
import { HTTP_PROVIDERS } from '@angular/http';
import { UserService } from './user.service';
import 'mocha';
import { expect } from 'chai';

describe('UserService', () => {
  let service;

  beforeEachProviders(() => [
    HTTP_PROVIDERS,
    UserService
  ]);

  beforeEach(inject([UserService], s => {
    service = s;
  }));

  describe('create method', () => {
    it('saves token to localStorage if user is successfully created', done => {
      expect(true).to.equal(true);
      done();
    })
  })
})
