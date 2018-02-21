import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { NamespaceLogsComponent } from './namespace-logs.component';
import { ELASTICSEARCH_SERVICE_MOCK_PROVIDER } from '../../../../shared/elasticsearch/elasticsearch.service.mock';
import { ElasticsearchRequestFactory } from '../../../../shared/elasticsearch/elasticsearch-request.factory';
import { TOASTR_SERVICE_MOCK_PROVIDER } from '../../../../shared/toastr/toastr.service.mock';
import { ACTIVATED_ROUTE_MOCK_PROVIDER } from '../../../../../testing/mocks/activated-route.mock';
import { ElasticsearchService } from '../../../../shared/elasticsearch/elasticsearch.service';

xdescribe('NamespaceLogsComponent', () => {
  let component: NamespaceLogsComponent;
  let fixture: ComponentFixture<NamespaceLogsComponent>;

  let elasticsearchService: ElasticsearchService;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(NamespaceLogsComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [NamespaceLogsComponent],
        providers: [
          ELASTICSEARCH_SERVICE_MOCK_PROVIDER,
          ElasticsearchRequestFactory,
          TOASTR_SERVICE_MOCK_PROVIDER,
          ACTIVATED_ROUTE_MOCK_PROVIDER,
          FormBuilder,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    elasticsearchService = TestBed.get(ElasticsearchService);
    spyOn(elasticsearchService, 'getLogs').and.returnValue(Observable.of([]));

    fixture = TestBed.createComponent(NamespaceLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
