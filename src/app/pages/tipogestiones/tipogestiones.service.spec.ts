import { TestBed } from '@angular/core/testing';

import { TipogestionesService } from './tipogestiones.service';

describe('TipogestionesService', () => {
  let service: TipogestionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipogestionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
