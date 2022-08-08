import { TestBed } from '@angular/core/testing';

import { AcDataServiceService } from '../Services/ac-data.service';

describe('AcDataService', () => {
  let service: AcDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
