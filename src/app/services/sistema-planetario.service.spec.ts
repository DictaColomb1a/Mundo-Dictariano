import { TestBed } from '@angular/core/testing';

import { SistemaPlanetarioService } from './sistema-planetario.service';

describe('SistemaPlanetarioService', () => {
  let service: SistemaPlanetarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SistemaPlanetarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
