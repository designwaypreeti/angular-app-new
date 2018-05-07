import { TestBed, inject } from '@angular/core/testing';

import { IsLoggedinService } from './is-loggedin.service';

describe('IsLoggedinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsLoggedinService]
    });
  });

  it('should be created', inject([IsLoggedinService], (service: IsLoggedinService) => {
    expect(service).toBeTruthy();
  }));
});
