import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SitespeedCronjobsListComponent } from './sitespeed-cronjobs-list.component';
import { SITESPEED_SERVICE_MOCK_PROVIDER } from '../../../../shared/sitespeed/sitespeed.service.mock';
import { KubernetesResponseFactory } from '../../../../shared/kubernetes/kubernetes-response.factory';
import { USER_MANAGER_PROVIDER_MOCK } from '../../../../shared/user/user.manager.mock';
import { TOASTR_SERVICE_MOCK_PROVIDER } from '../../../../shared/toastr/toastr.service.mock';
import { UserManager } from '../../../../shared/user/user.manager';
import { SiteSpeedService } from '../../../../shared/sitespeed/sitespeed.service';
import { ToastrService } from '../../../../shared/toastr/toastr.service';
import { USER } from '../../../../shared/user/user.data';
import { KUBERNETES_CRONJOBS } from '../../../../shared/kubernetes/cronjob/cronjobs.data';
import { NGB_MODAL_MOCK_PROVIDER } from '../../../../../testing/mocks/ngb-modal.mock';
import { SiteSpeedRequestFactory } from '../../../../shared/sitespeed/sitespeed-request.factory';
import Spy = jasmine.Spy;

describe('SitespeedCronjobsListComponent', () => {
  let component: SitespeedCronjobsListComponent;
  let fixture: ComponentFixture<SitespeedCronjobsListComponent>;

  let sitespeedService: SiteSpeedService;
  let toastrService: ToastrService;
  let userManager: UserManager;
  let ngbModal: NgbModal;

  let deleteCronJobSpy: Spy;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(SitespeedCronjobsListComponent, {
        set: {
          template: ''
        }
      })
      .configureTestingModule({
        declarations: [SitespeedCronjobsListComponent],
        providers: [
          SITESPEED_SERVICE_MOCK_PROVIDER,
          USER_MANAGER_PROVIDER_MOCK,
          TOASTR_SERVICE_MOCK_PROVIDER,
          NGB_MODAL_MOCK_PROVIDER,
          SiteSpeedRequestFactory,
          KubernetesResponseFactory,
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    sitespeedService = TestBed.get(SiteSpeedService);
    spyOn(sitespeedService, 'getCronJobs').and.returnValue(Observable.of(KUBERNETES_CRONJOBS));
    deleteCronJobSpy = spyOn(sitespeedService, 'deleteCronJob').and.returnValue(Observable.of(KUBERNETES_CRONJOBS[0]));

    toastrService = TestBed.get(ToastrService);

    userManager = TestBed.get(UserManager);
    userManager.user = Observable.of(USER);

    ngbModal = TestBed.get(NgbModal);
    spyOn(ngbModal, 'open');

    fixture = TestBed.createComponent(SitespeedCronjobsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set cronjobs', () => {
      expect(component.cronjobs.length).toBe(1);
    });
  });

  describe('delete', () => {
    it('should not delete if user did not confirm', () => {
      spyOn(window, 'confirm').and.returnValue(false);
      expect(component.cronjobs.length).toBe(1);

      component.deleteCronJob(KUBERNETES_CRONJOBS[0].metadata.name);

      expect(deleteCronJobSpy).not.toHaveBeenCalled();
      expect(component.cronjobs.length).toBe(1);
    });

    it('should delete and remove from cronjobs[] if user confirmed', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      expect(component.cronjobs.length).toBe(1);

      component.deleteCronJob(KUBERNETES_CRONJOBS[0].metadata.name);

      expect(deleteCronJobSpy).toHaveBeenCalledWith({
        params: {
          name: KUBERNETES_CRONJOBS[0].metadata.name
        }
      });
      expect(component.cronjobs.length).toBe(0);
    });
  });
});
