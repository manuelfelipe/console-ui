import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PodResourcesComponent } from './pod-resources.component';
import { RESOURCES_SERVICE_MOCK_PROVIDER } from '../../../../../shared/resources/resources.service.mock';
import { ResourcesRequestFactory } from '../../../../../shared/resources/resources-request.factory';
import { BytesToMegabytesPipe } from '../../../../../shared/pipes/bytesToMegabytes/bytes-to-megabytes.pipe';
import { MilliCoresToCoresPipe } from '../../../../../shared/pipes/millicoresToCores/millicores-to-cores.pipe';

describe('PodResourcesComponent', () => {
  let component: PodResourcesComponent;
  let fixture: ComponentFixture<PodResourcesComponent>;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(PodResourcesComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [PodResourcesComponent],
        providers: [
          RESOURCES_SERVICE_MOCK_PROVIDER,
          ResourcesRequestFactory,
          BytesToMegabytesPipe,
          MilliCoresToCoresPipe,
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getValue', () => {
    it('not convert', () => {
      const value = component.getValue('unknown', 1000000);
      expect(value).toBe(1000000);
    });

    it('convert to memory', () => {
      const value = component.getValue('memory', 1000000);
      expect(value).toBe(1);
    });

    it('convert to cpu', () => {
      const value = component.getValue('cpu', 1000000);
      expect(value).toBe(1000);
    });
  });
});
