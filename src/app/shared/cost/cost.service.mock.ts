import { Observable } from 'rxjs/Observable';
import { BaseRequest } from '../base-service/base-request';
import { CostService } from './cost.service';
import { Cost } from './cost';

class CostServiceMock {

  getCosts(request: BaseRequest): Observable<Cost> {
    throw new Error('CostServiceMock.getCosts unimplemented');
  }

}

export const COST_SERVICE_MOCK_PROVIDER = {
  provide: CostService,
  useClass: CostServiceMock,
};
