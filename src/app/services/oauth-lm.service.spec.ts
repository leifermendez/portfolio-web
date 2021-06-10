import { TestBed } from '@angular/core/testing';

import { OAuthLmService } from './oauth-lm.service';

describe('OAuthLmService', () => {
  let service: OAuthLmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OAuthLmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
