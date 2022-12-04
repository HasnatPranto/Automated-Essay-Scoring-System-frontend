import { TestBed } from '@angular/core/testing';

import { AssessorService } from './assessor.service';

describe('AssessorService', () => {
  let service: AssessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
