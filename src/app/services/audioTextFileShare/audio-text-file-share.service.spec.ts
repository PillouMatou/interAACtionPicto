import { TestBed } from '@angular/core/testing';

import { AudioTextFileShareService } from './audio-text-file-share.service';

describe('AudioTextFileShareService', () => {
  let service: AudioTextFileShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioTextFileShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
