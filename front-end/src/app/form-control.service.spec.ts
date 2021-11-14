import { TestBed } from '@angular/core/testing';

import { FormControlService } from './form-control.service';

describe('FormControlService', () => {
  let service: FormControlService;

  beforeEach(() => {
  
    service = new FormControlService();
  });

  it('should be created', () => {
    
    expect(service.isValidDate(new Date('11/22/299'))).toBe(false)

  });
});
