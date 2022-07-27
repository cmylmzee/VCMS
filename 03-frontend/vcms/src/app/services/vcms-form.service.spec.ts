import { TestBed } from '@angular/core/testing';

import { VcmsFormService } from './vcms-form.service';

describe('VcmsFormService', () => {
  let service: VcmsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VcmsFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
