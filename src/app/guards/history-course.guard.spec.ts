import { TestBed } from '@angular/core/testing';

import { HistoryCourseGuard } from './history-course.guard';

describe('HistoryCourseGuard', () => {
  let guard: HistoryCourseGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HistoryCourseGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
