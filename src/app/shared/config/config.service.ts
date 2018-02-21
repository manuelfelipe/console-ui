import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class ConfigService {
  getConfig(key: string): string {
    return environment[key] || null;
  }
}
