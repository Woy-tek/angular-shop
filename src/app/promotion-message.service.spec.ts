import { TestBed } from '@angular/core/testing';

import { PromotionMessageService } from './promotion-message.service';

describe('PromotionMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PromotionMessageService = TestBed.get(PromotionMessageService);
    expect(service).toBeTruthy();
  });
});
