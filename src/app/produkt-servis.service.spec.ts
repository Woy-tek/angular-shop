import { TestBed } from '@angular/core/testing';

import { ProduktServisService } from './produkt-servis.service';

describe('ProduktServisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProduktServisService = TestBed.get(ProduktServisService);
    expect(service).toBeTruthy();
  });
});
