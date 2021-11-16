import { TestBed } from '@angular/core/testing';

import { EditionServiceService } from './edition-service';

describe('EditionServiceService', () => {
  let service: EditionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
