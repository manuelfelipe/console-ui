import { keys, toLower } from 'lodash';
import { BaseRequest } from '../base-service/base-request';
import { ProvisionAppType } from '../../application/self-service/provisions/provision-app/provision-app-type';
import { ProvisionAppLanguage } from '../../application/self-service/provisions/provision-app/provision-app-language';

export class ProvisionsRequestFactory {
  toInitNewProjectRequest(owner: string, repo: string, configs: any): BaseRequest {
    const newProjectConfigs: any = {};

    if (configs && configs.app) {
      newProjectConfigs.app = configs.app;
    }

    if (configs && configs.dns) {
      newProjectConfigs.dns = this.processDnsNames(configs.dns);
    }

    if (configs && configs.db) {
      const db = this.processDB(configs.db);
      newProjectConfigs[db] = {};
    }

    return {
      params: {
        owner,
        repo,
      },
      body: {
        configs: newProjectConfigs,
      }
    };
  };

  toProvisionAppRequest(owner: string, repo: string, language: ProvisionAppLanguage, type: ProvisionAppType): BaseRequest {
    return {
      params: {
        owner,
        repo,
      },
      body: {
        service: 'app',
        config: {
          language: ProvisionAppLanguage[language],
          type: ProvisionAppType[type],
        }
      }
    };
  };

  toProvisionDBRequest(owner: string, repo: string, type: string): BaseRequest {
    return {
      params: {
        owner,
        repo,
      },
      body: {
        service: type,
        config: {}
      }
    };
  };

  toCheckDNSRequest(dns: string, type: string): BaseRequest {
    return {
      queryParams: {
        dns,
        type,
      },
    };
  };

  toProvisionDNSRequest(owner: string, repo: string, dns: { [key: string]: string }): BaseRequest {
    return {
      params: {
        owner,
        repo,
      },
      body: {
        service: 'dns',
        config: this.processDnsNames(dns)
      }
    };
  };

  processDB(db: { type: string }) {
    return toLower(db.type);
  };

  processDnsNames(dns: { [key: string]: string }): { names: string[] } {
    return { names: keys(dns).map(key => (toLower(`${dns[key]}${key}`) )) };
  };

}
