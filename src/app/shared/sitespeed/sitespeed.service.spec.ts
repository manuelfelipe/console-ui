import { ConnectionBackend, Http, HttpModule } from '@angular/http';
import { TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ConfigService } from '../config/config.service';
import { SiteSpeedService } from './sitespeed.service';
import { SiteSpeedRequestFactory } from './sitespeed-request.factory';

describe('SiteSpeedService tests', () => {
  let service: SiteSpeedService;
  let requestFactory: SiteSpeedRequestFactory;
  let configService: ConfigService;
  let backend: MockBackend;
  let http: Http;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [],
      providers: [
        ConfigService,
        SiteSpeedService,
        SiteSpeedRequestFactory,
        Http,
        {
          provide: ConnectionBackend,
          useClass: MockBackend,
        },
      ],
    });
  });

  beforeEach(() => {
    service = TestBed.get(SiteSpeedService);
    requestFactory = TestBed.get(SiteSpeedRequestFactory);
    configService = TestBed.get(ConfigService);
    backend = TestBed.get(ConnectionBackend);
    http = TestBed.get(Http);
  });

  it('should be instantiable', () => {
    expect(service).toBeDefined();
  });

  describe('getCronJobs', () => {
    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      service.getCronJobs()
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('createCronJob', () => {
    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toCreateCronJobRequest('CronJobName', '* * * * *', ['yp.ca'], ['-b', 'chrome']);
      service.createCronJob(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('updateCronJob', () => {
    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toUpdateCronJobRequest('CronJobName', '* * * * *', ['yp.ca'], ['-b', 'chrome']);
      service.updateCronJob(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('deleteCronJob', () => {
    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toDeleteCronJobRequest('CronJobName');
      service.deleteCronJob(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('getCronJobReports', () => {
    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetCronJobReportsRequest('CronJobName');
      service.getCronJobReports(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

});
