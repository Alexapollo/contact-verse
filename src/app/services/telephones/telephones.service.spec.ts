import { TestBed, inject } from '@angular/core/testing';

import { TelephonesService } from './telephones.service';

describe('TelephonesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TelephonesService]
    });
  });

  it('should be created', inject([TelephonesService], (service: TelephonesService) => {
    expect(service).toBeTruthy();
  }));
});
