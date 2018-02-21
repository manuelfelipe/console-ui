import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ApiCatalogSearchComponent } from './api-catalog-search.component';
import { ACTIVATED_ROUTE_MOCK_PROVIDER } from '../../../../../testing/mocks/activated-route.mock';
import { ELASTICSEARCH_SERVICE_MOCK_PROVIDER } from '../../../../shared/elasticsearch/elasticsearch.service.mock';
import { ElasticsearchService } from '../../../../shared/elasticsearch/elasticsearch.service';
import { ElasticsearchRequestFactory } from '../../../../shared/elasticsearch/elasticsearch-request.factory';
import { API_CATALOG_SERVICE_GROUPS } from '../../../../shared/elasticsearch/api-catalog-service-groups.data';
import Spy = jasmine.Spy;

describe('ApiCatalogSearchComponent', () => {
  let component: ApiCatalogSearchComponent;
  let fixture: ComponentFixture<ApiCatalogSearchComponent>;

  let elasticsearchService: ElasticsearchService;
  let route: ActivatedRoute;
  let getServiceGroupsSpy: Spy;
  let emitSpy: Spy;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(ApiCatalogSearchComponent, {
        set: {
          template: ''
        }
      })
      .configureTestingModule({
        declarations: [ApiCatalogSearchComponent],
        providers: [
          ELASTICSEARCH_SERVICE_MOCK_PROVIDER,
          ElasticsearchRequestFactory,
          ACTIVATED_ROUTE_MOCK_PROVIDER,
          FormBuilder,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    elasticsearchService = TestBed.get(ElasticsearchService);
    getServiceGroupsSpy = spyOn(elasticsearchService, 'getServiceGroups').and.returnValue(Observable.of(API_CATALOG_SERVICE_GROUPS));

    route = TestBed.get(ActivatedRoute);
    route.queryParams = Observable.of({
      env: 'qa',
      g: 'thecloud',
      q: 'console-develop, cloud',
    });

    fixture = TestBed.createComponent(ApiCatalogSearchComponent);
    component = fixture.componentInstance;
    emitSpy = spyOn(component.search, 'emit').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should init formGroup based on queryParams', () => {
      expect(component.serviceGroups).toEqual(API_CATALOG_SERVICE_GROUPS);
      expect(component.formGroup.value).toEqual({
        environment: 'qa',
        serviceGroup: 'thecloud',
        searchTerms: 'console-develop, cloud',
      });
    });

    it('should emit whenever formGroup.valueChanges', (done) => {
      component.formGroup.setValue({
        environment: 'dev',
        serviceGroup: 'cloud',
        searchTerms: 'console-server, cloud',
      });

      // not called yet
      expect(emitSpy).not.toHaveBeenCalled();

      // called after 200ms
      setTimeout(() => {
        expect(emitSpy).toHaveBeenCalledWith({
          environment: 'dev',
          serviceGroup: 'cloud',
          searchTerms: 'console-server, cloud',
        });

        // all is well
        done();
      }, 200);
    });
  });
});
