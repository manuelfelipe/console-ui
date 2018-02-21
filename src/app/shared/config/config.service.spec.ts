import { TestBed } from '@angular/core/testing';

import { ConfigService } from './config.service';

describe('ConfigService config loading tests', () => {
  let configService: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfigService,
      ],
    });
  });

  beforeEach(() => {
    configService = TestBed.get(ConfigService);
  });

  it('should be instantiable', () => {
    expect(configService).not.toBeNull();
  });

  it('should return null if not found', () => {
    const config = configService.getConfig('unknown');
    expect(config).toBeNull();
  });

  it('should return one config', () => {
    const config = configService.getConfig('serviceBaseUrl');
    expect(config).toBeDefined();
  });
});
