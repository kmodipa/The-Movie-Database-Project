import { TestBed } from '@angular/core/testing';

import { AccountsServiceService } from './accounts-service.service';

describe('AccountsServiceService', () => {
  let service: AccountsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
