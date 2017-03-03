/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserWrapperService } from './user-wrapper.service';

describe('UserWrapperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserWrapperService]
    });
  });

  it('should ...', inject([UserWrapperService], (service: UserWrapperService) => {
    expect(service).toBeTruthy();
  }));
});
