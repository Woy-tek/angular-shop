import { TestBed } from '@angular/core/testing';

import { PromoManagerService } from './promo-manager.service';

describe('PromoManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PromoManagerService = TestBed.get(PromoManagerService);
    expect(service).toBeTruthy();
  });
});
