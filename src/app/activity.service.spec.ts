import { TestBed } from '@angular/core/testing';

import { ActivityServiceService } from './activity-service.service';

describe('ActivityServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivityServiceService = TestBed.get(ActivityServiceService);
    expect(service).toBeTruthy();
  });
});
