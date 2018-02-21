import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NamespaceResourcesComponent } from './namespace-resources.component';
import { RESOURCES_SERVICE_MOCK_PROVIDER } from '../../../../../shared/resources/resources.service.mock';
import { PROJECT_MANAGER_MOCK_PROVIDER } from '../../../../../shared/project/project.manager.mock';
import { ResourcesRequestFactory } from '../../../../../shared/resources/resources-request.factory';
import { ResourcesService } from '../../../../../shared/resources/resources.service';
import { ProjectManager } from '../../../../../shared/project/project.manager';
import { NAMESPACE_RESOURCES } from '../../../../../shared/resources/namespace-resources.data';
import { LineChart } from '../../../../../shared/charts/line-chart';
import { BytesToMegabytesPipe } from '../../../../../shared/pipes/bytesToMegabytes/bytes-to-megabytes.pipe';
import { MilliCoresToCoresPipe } from '../../../../../shared/pipes/millicoresToCores/millicores-to-cores.pipe';
import Spy = jasmine.Spy;

describe('NamespaceResourcesComponent', () => {
  let component: NamespaceResourcesComponent;
  let fixture: ComponentFixture<NamespaceResourcesComponent>;

  let resourcesService: ResourcesService;
  let resourcesRequestFactory: ResourcesRequestFactory;
  let projectManager: ProjectManager;

  let bytesToMegabytesPipe: BytesToMegabytesPipe;
  let milliCoresToCoresPipe: MilliCoresToCoresPipe;

  let resourcesSpy: Spy;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(NamespaceResourcesComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [NamespaceResourcesComponent],
        providers: [
          RESOURCES_SERVICE_MOCK_PROVIDER,
          PROJECT_MANAGER_MOCK_PROVIDER,
          ResourcesRequestFactory,
          BytesToMegabytesPipe,
          MilliCoresToCoresPipe,
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    resourcesService = TestBed.get(ResourcesService);
    resourcesRequestFactory = TestBed.get(ResourcesRequestFactory);

    resourcesSpy = spyOn(resourcesService, 'getNamespaceResources').and.returnValue(Observable.of(NAMESPACE_RESOURCES));
    projectManager = TestBed.get(ProjectManager);
    projectManager.namespace = Observable.of('console-server');

    bytesToMegabytesPipe = TestBed.get(BytesToMegabytesPipe);
    milliCoresToCoresPipe = TestBed.get(MilliCoresToCoresPipe);

    fixture = TestBed.createComponent(NamespaceResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    const changes = {
      namespace: new SimpleChange('console-server', 'console-server', true)
    };

    it('should do nothing if namespace not changed', () => {
      component.namespace = 'console-server';
      component.ngOnChanges({});

      expect(resourcesSpy).not.toHaveBeenCalled();
    });

    it('should do nothing if namespace is null', () => {
      component.namespace = null;
      component.ngOnChanges(changes);

      expect(resourcesSpy).not.toHaveBeenCalled();
    });

    it('should set resources', () => {
      component.namespace = 'console-server';
      component.ngOnChanges(changes);

      const EXPECTED: { type: string, data: LineChart[] }[] = [
        {
          type: 'memory',
          data: [
            {
              name: component.getFormattedDate(new Date('2017-05-23T19:08:00Z')),
              series: [{
                name: 'gce',
                value: component.getValue('memory', 439648256)
              }, {
                name: 'aws',
                value: component.getValue('memory', 204541952)
              }],
              timestamp: new Date('2017-05-23T19:08:00Z')
            },
            {
              name: component.getFormattedDate(new Date('2017-05-23T19:09:00Z')),
              series: [{
                name: 'gce',
                value: component.getValue('memory', 445177856)
              }, {
                name: 'aws',
                value: component.getValue('memory', 206680064)
              }],
              timestamp: new Date('2017-05-23T19:09:00Z')
            },
            {
              name: component.getFormattedDate(new Date('2017-05-23T19:10:00Z')),
              series: [{
                name: 'gce',
                value: component.getValue('memory', 449527808)
              }, {
                name: 'aws',
                value: component.getValue('memory', 210239488)
              }],
              timestamp: new Date('2017-05-23T19:10:00Z')
            },
          ],
        },
        {
          type: 'cpu',
          data: [
            {
              name: component.getFormattedDate(new Date('2017-05-23T19:08:00Z')),
              series: [{
                name: 'gce',
                value: component.getValue('cpu', 1518)
              }, {
                name: 'aws',
                value: component.getValue('cpu', 300)
              }],
              timestamp: new Date('2017-05-23T19:08:00Z')
            },
            {
              name: component.getFormattedDate(new Date('2017-05-23T19:09:00Z')),
              series: [{
                name: 'gce',
                value: component.getValue('cpu', 1528)
              }, {
                name: 'aws',
                value: component.getValue('cpu', 294)
              }],
              timestamp: new Date('2017-05-23T19:09:00Z')
            },
            {
              name: component.getFormattedDate(new Date('2017-05-23T19:10:00Z')),
              series: [{
                name: 'gce',
                value: component.getValue('cpu', 1519)
              }, {
                name: 'aws',
                value: component.getValue('cpu', 302)
              }],
              timestamp: new Date('2017-05-23T19:10:00Z')
            },
          ],
        }
      ];

      expect(component.resources).toEqual(EXPECTED);
    });
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

  describe('sortByDate', () => {
    it('should return 1 if d1 > d2', () => {
      const d1 = new Date(2017, 6, 27);
      const d2 = new Date(2016, 6, 27);

      const sort = component.sortByDate(d1, d2);
      expect(sort).toBe(1);
    });

    it('should return -1 if d1 < d2', () => {
      const d1 = new Date(2016, 6, 27);
      const d2 = new Date(2017, 6, 27);

      const sort = component.sortByDate(d1, d2);
      expect(sort).toBe(-1);
    });

    it('should return 0 if equal dates', () => {
      const d1 = new Date(2017, 6, 27);
      const d2 = new Date(2017, 6, 27);

      const sort = component.sortByDate(d1, d2);
      expect(sort).toBe(0);
    });
  });
});
