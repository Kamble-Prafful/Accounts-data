import { TestBed } from '@angular/core/testing';

import { AcDataService } from './ac-data.service';

describe('AcDataService', () => {
  let service: AcDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
