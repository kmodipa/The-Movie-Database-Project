import { TestBed } from '@angular/core/testing';

import { ToasterNotificationServiceService } from './toaster-notification-service.service';

describe('ToasterNotificationServiceService', () => {
  let service: ToasterNotificationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToasterNotificationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
