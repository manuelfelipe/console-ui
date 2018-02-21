import { ToastrService } from './toastr.service';

class ToastrServiceMock {

  success(title?: string, body?: string): void {
    throw new Error('ToastrServiceMock.success unimplemented');
  }

  info(title?: string, body?: string): void {
    throw new Error('ToastrServiceMock.info unimplemented');
  }

  warning(title?: string, body?: string): void {
    throw new Error('ToastrServiceMock.warning unimplemented');
  }

  error(title?: string, body?: string): void {
    throw new Error('ToastrServiceMock.error unimplemented');
  }

  wait(title?: string, body?: string): void {
    throw new Error('ToastrServiceMock.wait unimplemented');
  }

}

export const TOASTR_SERVICE_MOCK_PROVIDER = {
  provide: ToastrService,
  useClass: ToastrServiceMock,
};
