import { TestBed } from '@angular/core/testing';

import { LoadingMaskService } from './loading-mask.service';

describe('LoadingMaskService', () => {
  let service: LoadingMaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingMaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
