import { TestBed } from '@angular/core/testing';

import { NgxDataConverterService } from './ngx-data-converter.service';

describe('NgxDataConverterService', () => {
  let service: NgxDataConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxDataConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
