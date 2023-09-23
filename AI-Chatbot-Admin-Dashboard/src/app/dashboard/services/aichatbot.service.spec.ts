import { TestBed } from '@angular/core/testing';

import { AichatbotService } from './aichatbot.service';

describe('AichatbotService', () => {
  let service: AichatbotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AichatbotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
