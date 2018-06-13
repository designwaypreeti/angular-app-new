import { TestBed, inject } from '@angular/core/testing';

import { OrganiserGuardService } from './organiser-guard.service';

describe('OrganiserGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrganiserGuardService]
    });
  });

  it('should be created', inject([OrganiserGuardService], (service: OrganiserGuardService) => {
    expect(service).toBeTruthy();
  }));
});
