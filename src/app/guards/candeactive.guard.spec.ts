import { TestBed } from '@angular/core/testing';

import { CandeactiveGuard } from './candeactive.guard';

describe('CandeactiveGuard', () => {
  let guard: CandeactiveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CandeactiveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
