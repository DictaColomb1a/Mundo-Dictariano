import { TestBed } from '@angular/core/testing';

import { SistemaPlanetarioInfoService } from './sistema-planetario-info.service';

describe('SistemaPlanetarioInfoService', () => {
  let service: SistemaPlanetarioInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SistemaPlanetarioInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
