import { TestBed } from '@angular/core/testing';

import { PlanetaInfoService } from './planeta-info.service';

describe('PlanetaInfoService', () => {
  let service: PlanetaInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanetaInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
