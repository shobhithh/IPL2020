import { TestBed } from '@angular/core/testing';

import { IplplayerdetailsService } from './iplplayerdetails.service';

describe('IplplayerdetailsService', () => {
  let service: IplplayerdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IplplayerdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
