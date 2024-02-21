import { TestBed } from '@angular/core/testing';

import { GalaxiaService } from './galaxia.service';

describe('GalaxiaService', () => {
  let service: GalaxiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalaxiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
