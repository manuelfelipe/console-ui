import { TestBed } from '@angular/core/testing';
import { ToasterService } from 'angular2-toaster';
import { ToastrService } from './toastr.service';
import Spy = jasmine.Spy;

describe('ToastrService tests', () => {
  let toastr: ToastrService;
  let toasterService: ToasterService;
  let toasterServicePopAsyncSpy: Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ToastrService,
        ToasterService,
      ],
    });
  });

  beforeEach(() => {
    toastr = TestBed.get(ToastrService);
    toasterService = TestBed.get(ToasterService);

    toasterServicePopAsyncSpy = spyOn(toasterService, 'popAsync');
  });

  it('should be instantiable', () => {
    expect(toastr).not.toBeNull();
  });

  it('should call toastr.pop with `success` and correct params', () => {
    toastr.success('TITLE', 'MESSAGE');
    expect(toasterServicePopAsyncSpy).toHaveBeenCalledWith('success', 'TITLE', 'MESSAGE');
  });

  it('should call toastr.pop with `info` and correct params', () => {
    toastr.info();
    expect(toasterServicePopAsyncSpy).toHaveBeenCalledWith('info', undefined, undefined);
  });

  it('should call toastr.pop with `warning` and correct params', () => {
    toastr.warning('TITLE');
    expect(toasterServicePopAsyncSpy).toHaveBeenCalledWith('warning', 'TITLE', undefined);
  });

  it('should call toastr.pop with `error` and correct params', () => {
    toastr.error(null, 'MESSAGE');
    expect(toasterServicePopAsyncSpy).toHaveBeenCalledWith('error', null, 'MESSAGE');
  });

  it('should call toastr.pop with `wait` and correct params', () => {
    toastr.wait(null, null);
    expect(toasterServicePopAsyncSpy).toHaveBeenCalledWith('wait', null, null);
  });
});
