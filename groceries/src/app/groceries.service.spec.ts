import { TestBed } from '@angular/core/testing';

import { GroceriesServicesService } from './groceries.service';

describe('GroceriesServicesService', () => {
  let service: GroceriesServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroceriesServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
