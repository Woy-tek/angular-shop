import { TestBed } from '@angular/core/testing';

import { MessageRoleService } from './message-role.service';

describe('MessageRoleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageRoleService = TestBed.get(MessageRoleService);
    expect(service).toBeTruthy();
  });
});
