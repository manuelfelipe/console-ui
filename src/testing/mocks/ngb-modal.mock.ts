import { Observable } from 'rxjs/Observable';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

export class NgbModalMock {

  open(content: any, options?: NgbModalOptions): NgbModalRef {
    return Observable.throw('NgbModalMock.open unimplemented') as any;
  }
}

export const NGB_MODAL_MOCK_PROVIDER = {
  provide: NgbModal,
  useClass: NgbModalMock,
};
