import { BaseRequest } from '../base-service/base-request';

export class DroneRequestFactory {
  toGetBuildsRequest(owner: string, name: string): BaseRequest {
    return {
      params: {
        owner,
        name,
      },
    };
  };

  toGetContributorsRequest(owner: string, name: string): BaseRequest {
    return {
      params: {
        owner,
        name,
      },
    };
  };

  toGetBuildRequest(owner: string, name: string, number: number): BaseRequest {
    return {
      params: {
        owner,
        name,
        number,
      },
    };
  };

  toGetLatestBuildRequest(owner: string, name: string, branch: string = 'master'): BaseRequest {
    return {
      params: {
        owner,
        name,
      },
      queryParams: {
        branch: branch,
      },
    };
  };

  toRestartBuildRequest(owner: string, name: string, number: number): BaseRequest {
    return {
      params: {
        owner,
        name,
        number,
      },
    };
  };

  toStopBuildRequest(owner: string, name: string, number: number, job: number): BaseRequest {
    return {
      params: {
        owner,
        name,
        number,
        job,
      },
    };
  };

  toGetBuildLogsRequest(owner: string, name: string, number: number, job: number): BaseRequest {
    return {
      params: {
        owner,
        name,
        number,
        job,
      },
    };
  };
}
