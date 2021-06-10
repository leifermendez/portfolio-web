import { TestBed } from '@angular/core/testing';

import { TokenUserGuard } from './token-user.guard';

describe('TokenUserGuard', () => {
  let guard: TokenUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TokenUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
