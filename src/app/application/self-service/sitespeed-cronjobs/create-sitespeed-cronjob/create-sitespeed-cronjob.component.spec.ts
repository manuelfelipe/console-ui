import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { cloneDeep } from 'lodash';
import { CreateSitespeedCronjobComponent } from './create-sitespeed-cronjob.component';
import { TOASTR_SERVICE_MOCK_PROVIDER } from '../../../../shared/toastr/toastr.service.mock';
import { SITESPEED_SERVICE_MOCK_PROVIDER } from '../../../../shared/sitespeed/sitespeed.service.mock';
import { KubernetesResponseFactory } from '../../../../shared/kubernetes/kubernetes-response.factory';
import { ToastrService } from '../../../../shared/toastr/toastr.service';
import { SiteSpeedService } from '../../../../shared/sitespeed/sitespeed.service';
import { KUBERNETES_CRONJOBS } from '../../../../shared/kubernetes/cronjob/cronjobs.data';
import { SiteSpeedRequestFactory } from '../../../../shared/sitespeed/sitespeed-request.factory';
import { CronJob } from '../../../../shared/kubernetes/cronjob/cronjob';
import Spy = jasmine.Spy;

describe('CreateSitespeedCronjobComponent', () => {
  let component: CreateSitespeedCronjobComponent;
  let fixture: ComponentFixture<CreateSitespeedCronjobComponent>;

  let sitespeedService: SiteSpeedService;
  let toastrService: ToastrService;

  let emitSpy: Spy;
  let createCronJobSpy: Spy;
  let updateCronJobSpy: Spy;

  let CRONJOB: CronJob;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(CreateSitespeedCronjobComponent, {
        set: {
          template: ''
        }
      })
      .configureTestingModule({
        declarations: [CreateSitespeedCronjobComponent],
        providers: [
          SITESPEED_SERVICE_MOCK_PROVIDER,
          TOASTR_SERVICE_MOCK_PROVIDER,
          SiteSpeedRequestFactory,
          KubernetesResponseFactory,
          FormBuilder,
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    sitespeedService = TestBed.get(SiteSpeedService);
    createCronJobSpy = spyOn(sitespeedService, 'createCronJob').and.returnValue(Observable.of(KUBERNETES_CRONJOBS[0]));
    updateCronJobSpy = spyOn(sitespeedService, 'updateCronJob').and.returnValue(Observable.of(KUBERNETES_CRONJOBS[0]));

    toastrService = TestBed.get(ToastrService);
    spyOn(toastrService, 'success');
    spyOn(toastrService, 'error');

    const kubernetesResponseFactory = new KubernetesResponseFactory();
    CRONJOB = kubernetesResponseFactory.toCronJob(KUBERNETES_CRONJOBS[0]);

    fixture = TestBed.createComponent(CreateSitespeedCronjobComponent);
    component = fixture.componentInstance;

    emitSpy = spyOn(component.onCreate, 'emit');
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should init with initial schedule/args', () => {
      expect(component.formGroup.value).toEqual({
        name: '',
        schedule: '0 0 * * *',
        urls: '',
        args: '-b\nchrome\n--speedIndex\n--html.showAllWaterfallSummary',
      });
      expect(component.isCustomSchedule).toBe(false);
    });

    it('should init with cronjob props, isCustomSchedule = true', () => {
      component.cronjob = cloneDeep(CRONJOB);
      component.ngOnInit();

      expect(component.formGroup.value).toEqual({
        // name is disabled, thus not here
        schedule: CRONJOB.schedule,
        urls: 'https://www.yellowpages.ca/\nhttps://preprod-ui.yellowpages.ca/\nhttps://qa-ui-mtl.yellowpages.ca/',
        args: '-b\nchrome\n--speedIndex\n--html.showAllWaterfallSummary',
      });
      expect(component.isCustomSchedule).toBe(true);
    });

    it('should init with cronjob props, isCustomSchedule = false', () => {
      component.cronjob = cloneDeep(CRONJOB);
      component.cronjob.schedule = component['schedules'][0].cron; // @hourly
      component.ngOnInit();

      expect(component.formGroup.value).toEqual({
        // name is disabled, thus not here
        schedule: component['schedules'][0].cron, // @hourly
        urls: 'https://www.yellowpages.ca/\nhttps://preprod-ui.yellowpages.ca/\nhttps://qa-ui-mtl.yellowpages.ca/',
        args: '-b\nchrome\n--speedIndex\n--html.showAllWaterfallSummary',
      });
      expect(component.isCustomSchedule).toBe(false);
      expect(component.selectedSchedule).toEqual(component['schedules'][0]);
    });
  });

  describe('selectSchedule', () => {
    it('should patch form and set selectedSchedule and isCustomSchedule=false', () => {
      // init with whatever
      component.isCustomSchedule = true;
      component.selectedSchedule = null;
      component.formGroup.patchValue({ schedule: null });

      // selectSchedule()
      component.selectSchedule(component['schedules'][0]);

      expect(component.formGroup.value.schedule).toEqual(component['schedules'][0].cron);
      expect(component.selectedSchedule).toEqual(component['schedules'][0]);
      expect(component.isCustomSchedule).toEqual(false);
    });
  });

  describe('create', () => {
    it('should create with correct urls[]/args[]', () => {
      component.formGroup.setValue({
        name: 'CronJob Name',
        schedule: '* * * * *',
        urls: 'url1\nurl2', // separated by new
        args: 'arg1\narg2', // lines in textarea
      });
      component.create();

      expect(createCronJobSpy).toHaveBeenCalledWith({
        body: {
          name: 'CronJob Name',
          schedule: '* * * * *',
          urls: ['url1', 'url2'],
          args: ['arg1', 'arg2'],
        }
      });
      expect(emitSpy).toHaveBeenCalledWith(CRONJOB); // it's the one returned by the spyOn.createCronJob
    });
  });

  describe('update', () => {
    it('should update with correct urls[]/args[]', () => {
      component.cronjob = cloneDeep(CRONJOB);
      component.formGroup.patchValue({ name: 'CronJob Name' }); // it will not use that name

      component.ngOnInit();
      component.update();

      expect(updateCronJobSpy).toHaveBeenCalledWith({
        params: {
          name: 'speed-yp-ca'
        },
        body: {
          schedule: '0/60 * * * ?',
          urls: ['https://www.yellowpages.ca/', 'https://preprod-ui.yellowpages.ca/', 'https://qa-ui-mtl.yellowpages.ca/'],
          args: ['-b', 'chrome', '--speedIndex', '--html.showAllWaterfallSummary'],
        }
      });
      expect(emitSpy).toHaveBeenCalledWith(CRONJOB); // it's the one returned by the spyOn.updateCronJob
    });
  });

  describe('textareaToArray', () => {
    it('should return empty array if passed null', () => {
      const array = component['textareaToArray'](null);
      expect(array).toEqual([]);
    });

    it('should return array without empty lines', () => {
      const array = component['textareaToArray']('url1\nurl2\nurl,3\nurl 4\n \n   \n   \n');
      expect(array).toEqual(['url1', 'url2', 'url,3', 'url 4']);
    });
  });
});
