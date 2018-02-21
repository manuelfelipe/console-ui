import { identity, pickBy } from 'lodash';
import { BaseRequest } from '../base-service/base-request';

export class CostRequestFactory {

  toGetCostsRequest(component?: string): BaseRequest {
    return {
      queryParams: pickBy({
        component,
      }, identity)
    };
  };

}
