import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ApiCatalogComponent } from './api-catalog.component';
import { ELASTICSEARCH_SERVICE_MOCK_PROVIDER } from '../../../shared/elasticsearch/elasticsearch.service.mock';
import { ElasticsearchRequestFactory } from '../../../shared/elasticsearch/elasticsearch-request.factory';
import { ElasticsearchService } from '../../../shared/elasticsearch/elasticsearch.service';
import { API_CATALOG_ENTRIES } from '../../../shared/elasticsearch/api-catalog-entries.data';
import { ACTIVATED_ROUTE_MOCK_PROVIDER } from '../../../../testing/mocks/activated-route.mock';
import { ROUTER_MOCK_PROVIDER } from '../../../../testing/mocks/router.mock';
import Spy = jasmine.Spy;

describe('ApiCatalogComponent', () => {
  let component: ApiCatalogComponent;
  let fixture: ComponentFixture<ApiCatalogComponent>;

  let elasticsearchService: ElasticsearchService;
  let router: Router;
  let route: ActivatedRoute;
  let searchAPICatalogSpy: Spy;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(ApiCatalogComponent, {
        set: {
          template: ''
        }
      })
      .configureTestingModule({
        declarations: [ApiCatalogComponent],
        providers: [
          ELASTICSEARCH_SERVICE_MOCK_PROVIDER,
          ElasticsearchRequestFactory,
          ACTIVATED_ROUTE_MOCK_PROVIDER,
          ROUTER_MOCK_PROVIDER,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    elasticsearchService = TestBed.get(ElasticsearchService);
    searchAPICatalogSpy = spyOn(elasticsearchService, 'searchAPICatalog').and.returnValue(Observable.of(API_CATALOG_ENTRIES));

    router = TestBed.get(Router);
    spyOn(router, 'navigate');

    route = TestBed.get(ActivatedRoute);
    route.queryParams = Observable.of({
      env: 'qa',
      g: 'thecloud',
      q: 'thecloudquotes',
    });

    fixture = TestBed.createComponent(ApiCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should search on init, based on queryParams', () => {
      expect(searchAPICatalogSpy).toHaveBeenCalledWith({
        params: {
          environment: 'qa',
        },
        queryParams: {
          serviceGroup: 'thecloud',
          searchTerms: 'thecloudquotes'
        }
      });
    });
  });

  describe('onSearch', () => {
    it('should not search if passed null', () => {
      searchAPICatalogSpy.calls.reset();

      component.apis = [];
      component.onSearch(null);

      expect(component.apis).toEqual([]);
      expect(searchAPICatalogSpy).not.toHaveBeenCalled();
    });

    it('should order apis by namespace', () => {
      searchAPICatalogSpy.calls.reset();

      component.apis = [];
      component.onSearch({ environment: 'dev', serviceGroup: 'cloud', searchTerms: 'console-server, cloud' });

      expect(component.apis).toEqual(API_CATALOG_ENTRIES);
      expect(searchAPICatalogSpy).toHaveBeenCalledTimes(1);
      expect(searchAPICatalogSpy).toHaveBeenCalledWith({
        params: {
          environment: 'dev',
        },
        queryParams: {
          serviceGroup: 'cloud',
          searchTerms: 'console-server, cloud',
        }
      });
    });
  });
});
