import { TestBed } from '@angular/core/testing';

import { ExpenseTrackerService } from './ExpenseTracker.service';

describe('ExpenseTrackerService', () => {
  let service: ExpenseTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpenseTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
