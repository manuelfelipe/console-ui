import { ConnectionBackend, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { KongService } from './kong.service';
import { ConfigService } from '../config/config.service';
import { KongRequestFactory } from './kong-request.factory';

describe('KubernetesService tests', () => {
  let service: KongService;
  let requestFactory: KongRequestFactory;
  let configService: ConfigService;
  let backend: MockBackend;
  let http: Http;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [],
      providers: [
        ConfigService,
        KongService,
        KongRequestFactory,
        Http,
        {
          provide: ConnectionBackend,
          useClass: MockBackend,
        },
      ],
    });
  });

  beforeEach(() => {
    service = TestBed.get(KongService);
    requestFactory = TestBed.get(KongRequestFactory);
    configService = TestBed.get(ConfigService);
    backend = TestBed.get(ConnectionBackend);
    http = TestBed.get(Http);
  });

  it('should be instantiable', () => {
    expect(service).toBeDefined();
  });

  describe('getConsumers', () => {
    it('should fail when input is missing', () => {
      service.getConsumers(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetConsumersRequest('namespace');
      service.getConsumers(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('getConsumerByUsername', () => {
    it('should fail when input is missing', () => {
      service.getConsumerByUsername(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when username param is missing', () => {
      const request = requestFactory.toGetConsumerByUsernameRequest(null);
      service.getConsumerByUsername(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('username param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetConsumerByUsernameRequest('username');
      service.getConsumerByUsername(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('getConsumersByNamespace', () => {
    it('should fail when input is missing', () => {
      service.getConsumersByNamespace(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when namespace param is missing', () => {
      const request = requestFactory.toGetConsumersByNamespaceRequest(null);
      service.getConsumersByNamespace(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('namespace param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetConsumersByNamespaceRequest('namespace');
      service.getConsumersByNamespace(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('getConsumerPluginConfig', () => {
    it('should fail when input is missing', () => {
      service.getConsumerPluginConfig(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when username param is missing', () => {
      const request = requestFactory.toGetConsumerPluginConfigRequest(null, 'acls');
      service.getConsumerPluginConfig(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('username param is required'));
    });

    it('should fail when pluginName param is missing', () => {
      const request = requestFactory.toGetConsumerPluginConfigRequest('default@console-develop', null);
      service.getConsumerPluginConfig(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('pluginName param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetConsumerPluginConfigRequest('default@console-develop', 'acls');
      service.getConsumerPluginConfig(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('createConsumerPluginConfig', () => {
    it('should fail when input is missing', () => {
      service.getConsumerPluginConfig(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when username param is missing', () => {
      const request = requestFactory.toCreateConsumerPluginConfigRequest(null, 'acls', 'console-develop', {});
      service.createConsumerPluginConfig(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('username param is required'));
    });

    it('should fail when pluginName param is missing', () => {
      const request = requestFactory.toCreateConsumerPluginConfigRequest('default@console-develop', null, 'console-develop', {});
      service.createConsumerPluginConfig(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('pluginName param is required'));
    });

    it('should fail when namespace body is missing', () => {
      const request = requestFactory.toCreateConsumerPluginConfigRequest('default@console-develop', 'acls', null, {});
      service.createConsumerPluginConfig(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('pluginName param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toCreateConsumerPluginConfigRequest('default@console-develop', 'acls', 'console-develop', {});
      service.createConsumerPluginConfig(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('deleteConsumerPluginConfig', () => {
    it('should fail when input is missing', () => {
      service.deleteConsumerPluginConfig(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when username param is missing', () => {
      const request = requestFactory.toDeleteConsumerPluginConfigRequest(null, 'acls', 'config-id');
      service.deleteConsumerPluginConfig(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('username param is required'));
    });

    it('should fail when pluginName param is missing', () => {
      const request = requestFactory.toDeleteConsumerPluginConfigRequest('default@console-develop', null, 'config-id');
      service.deleteConsumerPluginConfig(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('pluginName param is required'));
    });

    it('should fail when configId param is missing', () => {
      const request = requestFactory.toDeleteConsumerPluginConfigRequest('default@console-develop', 'acls', null);
      service.deleteConsumerPluginConfig(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('configId param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toDeleteConsumerPluginConfigRequest('default@console-develop', 'acls', 'config-id');
      service.deleteConsumerPluginConfig(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('createConsumer', () => {
    it('should fail when input is missing', () => {
      service.createConsumer(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when username body is missing', () => {
      const request = requestFactory.toCreateConsumerRequest(null);
      service.createConsumer(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('username body is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toCreateConsumerRequest('username');
      service.createConsumer(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('deleteConsumer', () => {
    it('should fail when input is missing', () => {
      service.deleteConsumer(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when username param is missing', () => {
      const request = requestFactory.toDeleteConsumerRequest(null);
      service.deleteConsumer(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('username param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toDeleteConsumerRequest('username');
      service.deleteConsumer(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('getPlugins', () => {
    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      service.getPlugins()
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('getEnabledPlugins', () => {
    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      service.getEnabledPlugins()
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('getPluginById', () => {
    it('should fail when input is missing', () => {
      service.getPluginById(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when id param is missing', () => {
      const request = requestFactory.toGetPluginByIdRequest(null);
      service.getPluginById(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('id param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetPluginByIdRequest('ID');
      service.getPluginById(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('getPluginSchema', () => {
    it('should fail when input is missing', () => {
      service.getPluginSchema(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when name param is missing', () => {
      const request = requestFactory.toGetPluginSchemaRequest(null);
      service.getPluginSchema(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('name param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetPluginSchemaRequest('ID');
      service.getPluginSchema(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('getApis', () => {
    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      service.getApis()
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('getApiById', () => {
    it('should fail when input is missing', () => {
      service.getApiById(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when name param is missing', () => {
      const request = requestFactory.toGetApiByIdRequest(null);
      service.getApiById(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('id param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetApiByIdRequest('ID');
      service.getApiById(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('getApiPlugins', () => {
    it('should fail when input is missing', () => {
      service.getApiPlugins(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when id param is missing', () => {
      const request = requestFactory.toGetApiPluginsRequest(null);
      service.getApiPlugins(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('id param is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toGetApiPluginsRequest('ID');
      service.getApiPlugins(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('addApiPlugin', () => {
    it('should fail when input is missing', () => {
      service.addApiPlugin(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when id param is missing', () => {
      const request = requestFactory.toAddApiPluginRequest(null, 'pluginName', {});
      service.addApiPlugin(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('id param is required'));
    });

    it('should fail when name body is missing', () => {
      const request = requestFactory.toAddApiPluginRequest('apiId', null, {});
      service.addApiPlugin(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('name body is required'));
    });

    it('should fail when config body is missing', () => {
      const request = requestFactory.toAddApiPluginRequest('apiId', 'pluginName', null);
      service.addApiPlugin(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('config body is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      const request = requestFactory.toAddApiPluginRequest('apiId', 'pluginName', {});
      service.addApiPlugin(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });

  describe('updateApiPlugin', () => {
    it('should fail when input is missing', () => {
      service.updateApiPlugin(null)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('input is required'));
    });

    it('should fail when id param is missing', () => {
      const request = requestFactory.toUpdateApiPluginRequest(null, 'pluginId', 'pluginName', {}, true);
      service.updateApiPlugin(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('id param is required'));
    });

    it('should fail when id body is missing', () => {
      const request = requestFactory.toUpdateApiPluginRequest('apiId', null, 'pluginName', {}, true);
      service.updateApiPlugin(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('id body is required'));
    });

    it('should fail when name body is missing', () => {
      const request = requestFactory.toUpdateApiPluginRequest('apiId', 'pluginId', null, {}, true);
      service.updateApiPlugin(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('name body is required'));
    });

    it('should fail when config body is missing', () => {
      const request = requestFactory.toUpdateApiPluginRequest('apiId', 'pluginId', 'pluginName', null, true);
      service.updateApiPlugin(request)
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('config body is required'));
    });

    it('should fail when calling service fails', () => {
      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('error with connection'));
      });

      // enabled param is optional
      const request = requestFactory.toUpdateApiPluginRequest('apiId', 'pluginId', 'pluginName', {}, null);
      service.updateApiPlugin(request)
        .subscribe(() => {
          fail();
        }, error => expect(error.message).toBe('error with connection'));
    });
  });
});
