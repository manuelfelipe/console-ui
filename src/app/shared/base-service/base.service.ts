import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../config/config.service';
import { isArray } from 'rxjs/util/isArray';
import { BaseRequest } from './base-request';
import { BaseResponse } from './base-response';
import { RequestRequirements } from './request-requirements';

@Injectable()
export class BaseService {

  protected baseServiceUrl = '';
  protected baseServiceKey: string = null;
  protected serviceDomainUrl: string = this.configService.getConfig('serviceBaseUrl');

  constructor(protected http: Http,
              protected configService: ConfigService) {
  }

  protected callService(request: BaseRequest, requirements: RequestRequirements): Observable<BaseResponse> {
    const token = localStorage.getItem('thecloud.token');
    this.baseServiceKey = this.baseServiceKey || token;

    if (request && this.baseServiceKey) {
      request.headers = request.headers || {};
      request.headers['token'] = this.baseServiceKey;
    }

    return this.validateInput(request, requirements)
      .map(validatedInput => this.getServiceUrl(request, requirements))
      .mergeMap(url => this.callWebService(url, request, requirements))
      .mergeMap(res => this.handleErrors(res))
      .map(validRes => this.extractData(validRes));
  }

  private getServiceUrl(request: BaseRequest, requirements: RequestRequirements): string {
    let path = requirements.path;

    // Loop through request params. If it matches a :path, replace it
    if (request.params) {
      Object.keys(request.params).forEach(key => {
        const replaceRegex = new RegExp(`:${key}`, 'g');
        path = path.replace(replaceRegex, request.params[key]);
      });
    }

    return `${this.serviceDomainUrl}${this.baseServiceUrl}${path}`;
  }

  private callWebService(url: string, request: BaseRequest, requirements: RequestRequirements): Observable<Response> {
    // Defaults to 'GET' method
    const method = requirements.method || 'get';

    const queryParams = [];
    const headers = new Headers();

    // set QueryParams
    if (request.queryParams) {
      Object.keys(request.queryParams)
        .forEach(function (key) {
          const value = request.queryParams[key];

          // Dirty hack to support arrays, as they must be passed as, e.g:
          // leadIds[]=leadIdOne&leadIds[]=leadIdTwo&leadIds[]=leadIdThree
          if (isArray(value)) {
            value.forEach(valueInstance => {
              queryParams.push(`${key}[]=${valueInstance}`);
            });
          } else {
            queryParams.push(`${key}=${value}`);
          }
        });
    }

    // set Headers
    if (request.headers) {
      Object.keys(request.headers)
        .forEach(function (key) {
          const value = request.headers[key];
          headers.set(key, value);
        });
    }

    const requestOptions: RequestOptionsArgs = {
      method: method,
      search: queryParams.join('&'),
      body: request.body,
      headers: headers,
    };

    return this.http.request(url, requestOptions);
  }

  private validateRequiredHeaders(request: BaseRequest, requirements: RequestRequirements): Observable<BaseRequest> {
    const requiredHeaders = requirements.requiredHeaders;

    if (requiredHeaders) {
      for (let i = 0; i < requiredHeaders.length; ++i) {
        const param = requiredHeaders[i];

        if (!request.headers || !request.headers[param]) {
          return Observable.throw(`${param} header is required`);
        }
      }
    }

    return Observable.of(request);
  }

  private validateRequiredBody(request: BaseRequest, requirements: RequestRequirements): Observable<BaseRequest> {
    const requiredBody = requirements.requiredBody;

    if (requiredBody) {
      for (let i = 0; i < requiredBody.length; ++i) {
        const param = requiredBody[i];

        if (!request.body || !request.body[param] && !(request.body[param] !== 0 || request.body[param] !== '0')) {
          return Observable.throw(`${param} body is required`);
        }
      }
    }

    return Observable.of(request);
  }

  private validateRequiredParams(request: BaseRequest, requirements: RequestRequirements): Observable<BaseRequest> {
    const requiredParams = requirements.requiredParams;

    if (requiredParams) {
      for (let i = 0; i < requiredParams.length; ++i) {
        const param = requiredParams[i];

        if (!request.params || !request.params[param]) {
          return Observable.throw(`${param} param is required`);
        }
      }
    }

    return Observable.of(request);
  }

  private validateRequiredQueryParams(request: BaseRequest, requirements: RequestRequirements): Observable<BaseRequest> {
    const requiredQueryParams = requirements.requiredQueryParams;

    if (requiredQueryParams) {
      for (let i = 0; i < requiredQueryParams.length; ++i) {
        const param = requiredQueryParams[i];

        if (!request.queryParams || !request.queryParams[param]) {
          return Observable.throw(`${param} queryParam is required`);
        }
      }
    }

    return Observable.of(request);
  }

  private validateInput(request: BaseRequest, requirements: RequestRequirements): Observable<BaseRequest> {
    if (!request) {
      return Observable.throw('input is required');
    }

    return Observable.of(request)
      .mergeMap(req => this.validateRequiredParams(req, requirements))
      .mergeMap(req => this.validateRequiredQueryParams(req, requirements))
      .mergeMap(req => this.validateRequiredHeaders(req, requirements))
      .mergeMap(req => this.validateRequiredBody(req, requirements));
  }

  private handleErrors(res: Response): Observable<Response> {
    const body: any = res.json();
    const status: boolean = !!body && body.result;

    if (!status) {
      return Observable.throw(`request failed with response status: ${status}`);
    }

    return Observable.of(res);
  }

  private extractData(res: Response): BaseResponse {
    const body: any = res.json();
    return body.data;
  }
}
