import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { cloneDeep } from 'lodash';
import { ApiDetailsComponent } from './api-details.component';
import { KongService } from '../../../../shared/kong/kong.service';
import { KongRequestFactory } from '../../../../shared/kong/kong-request.factory';
import { KongResponseFactory } from '../../../../shared/kong/kong-response.factory';
import { ToastrService } from '../../../../shared/toastr/toastr.service';
import { KONG_SERVICE_MOCK_PROVIDER } from '../../../../shared/kong/kong.service.mock';
import { TOASTR_SERVICE_MOCK_PROVIDER } from '../../../../shared/toastr/toastr.service.mock';
import { KONG_APIS } from '../../../../shared/kong/api/apis.data';
import Spy = jasmine.Spy;

describe('ApiDetailsComponent', () => {
  let component: ApiDetailsComponent;
  let fixture: ComponentFixture<ApiDetailsComponent>;

  let kongService: KongService;
  let kongRequestFactory: KongRequestFactory;
  let kongResponseFactory: KongResponseFactory;
  let toastrService: ToastrService;

  let getApiSpy: Spy;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(ApiDetailsComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [ApiDetailsComponent],
        providers: [
          KongRequestFactory,
          KongResponseFactory,
          KONG_SERVICE_MOCK_PROVIDER,
          TOASTR_SERVICE_MOCK_PROVIDER,
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    kongService = TestBed.get(KongService);
    kongRequestFactory = TestBed.get(KongRequestFactory);
    kongResponseFactory = TestBed.get(KongResponseFactory);
    toastrService = TestBed.get(ToastrService);

    getApiSpy = spyOn(kongService, 'getApiById');

    fixture = TestBed.createComponent(ApiDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have `erred` as false on init', () => {
    expect(component['erred']).toBe(false);
  });

  describe('ngOnChanges', () => {
    it('should not do anything if no namespace', () => {
      component.namespace = null;
      const changes = {
        namespace: new SimpleChange(null, null, true)
      };

      component.ngOnChanges(changes);
      expect(getApiSpy).not.toHaveBeenCalled();
    });

    it('should set `erred` to true if service fails', () => {
      getApiSpy.and.returnValue(Observable.throw('Error'));

      component.namespace = 'console-server';
      const changes = {
        namespace: new SimpleChange('console-server', 'console-server', true)
      };

      component.ngOnChanges(changes);

      expect(component['erred']).toBe(true);
      expect(getApiSpy).toHaveBeenCalled();
    });

    it('should return api, and replace empty objects as empty strings', () => {
      const response = cloneDeep(KONG_APIS[0]);
      response.uris = {} as any;

      getApiSpy.and.returnValue(Observable.of(response));

      const EXPECTED = kongResponseFactory.toApi(KONG_APIS[0]);
      EXPECTED.uris = '' as any;

      component.namespace = 'console-server';
      const changes = {
        namespace: new SimpleChange('console-server', 'console-server', true)
      };

      component.ngOnChanges(changes);

      expect(component['erred']).toBe(false);
      expect(component.api).toEqual(EXPECTED);
      expect(getApiSpy).toHaveBeenCalled();
    });
  });
});
