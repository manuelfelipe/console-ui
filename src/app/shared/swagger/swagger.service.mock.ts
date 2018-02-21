import { Observable } from 'rxjs/Observable';
import { BaseRequest } from '../base-service/base-request';
import { SwaggerService } from './swagger.service';

class SwaggerServiceMock {

  getSwaggerFile(request: BaseRequest): Observable<any> {
    throw new Error('SwaggerServiceMock.getSwaggerFile unimplemented');
  }

}

export const SWAGGER_SERVICE_MOCK_PROVIDER = {
  provide: SwaggerService,
  useClass: SwaggerServiceMock,
};
