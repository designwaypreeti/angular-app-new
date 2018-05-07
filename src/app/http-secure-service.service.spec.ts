import { TestBed, inject } from '@angular/core/testing';

import { HttpSecureServiceService } from './http-secure-service.service';

describe('HttpSecureServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpSecureServiceService]
    });
  });

  it('should be created', inject([HttpSecureServiceService], (service: HttpSecureServiceService) => {
    expect(service).toBeTruthy();
  }));
});
