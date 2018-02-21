import { BaseRequest } from '../base-service/base-request';

export class SiteSpeedRequestFactory {

  toCreateCronJobRequest(name: string, schedule: string, urls: string[], args: string[]): BaseRequest {
    return {
      body: {
        name,
        schedule,
        urls,
        args,
      }
    };
  };

  toUpdateCronJobRequest(name: string, schedule: string, urls: string[], args: string[]): BaseRequest {
    return {
      params: {
        name,
      },
      body: {
        schedule,
        urls,
        args,
      }
    };
  };

  toDeleteCronJobRequest(name: string): BaseRequest {
    return {
      params: {
        name,
      }
    };
  };

  toGetCronJobReportsRequest(name: string): BaseRequest {
    return {
      params: {
        name,
      }
    };
  };

}
