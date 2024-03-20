import { TestBed } from '@angular/core/testing';

import { ParticipantsApiService } from './participants-api.service';

describe('ParticipantsApiServiceService', () => {
  let service: ParticipantsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticipantsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
