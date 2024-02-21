import { TestBed } from '@angular/core/testing';

import { PlanetaService } from './planeta.service';

describe('PlanetaService', () => {
  let service: PlanetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
