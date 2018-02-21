import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProvisionsComponent } from './provisions.component';
import { ProvisionsService } from '../../../../shared/provisions/provisions.service';
import { ProvisionsRequestFactory } from '../../../../shared/provisions/provisions-request.factory';
import { PROVISIONS_SERVICE_MOCK_PROVIDER } from '../../../../shared/provisions/provisions.service.mock';
import { TOASTR_SERVICE_MOCK_PROVIDER } from '../../../../shared/toastr/toastr.service.mock';
import { NGB_MODAL_MOCK_PROVIDER } from '../../../../../testing/mocks/ngb-modal.mock';
import { ToastrService } from '../../../../shared/toastr/toastr.service';
import Spy = jasmine.Spy;

describe('ProvisionsComponent', () => {
  let component: ProvisionsComponent;
  let fixture: ComponentFixture<ProvisionsComponent>;

  let ngbModal: NgbModal;
  let provisionsService: ProvisionsService;
  let toastrService: ToastrService;

  let openSpy: Spy;
  let initNewProjectSpy: Spy;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(ProvisionsComponent, {
        set: {
          template: ''
        }
      })
      .configureTestingModule({
        declarations: [ProvisionsComponent],
        providers: [
          TOASTR_SERVICE_MOCK_PROVIDER,
          PROVISIONS_SERVICE_MOCK_PROVIDER,
          ProvisionsRequestFactory,
          NGB_MODAL_MOCK_PROVIDER,
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    ngbModal = TestBed.get(NgbModal);
    openSpy = spyOn(ngbModal, 'open');

    toastrService = TestBed.get(ToastrService);

    provisionsService = TestBed.get(ProvisionsService);
    initNewProjectSpy = spyOn(provisionsService, 'initNewProject').and.returnValue(Observable.of({}));

    fixture = TestBed.createComponent(ProvisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init empty formGroup', () => {
    expect(component.formGroup.value).toEqual({});
  });

  describe('onSubmit', () => {
    it('should submit form and open modal on success', () => {
      // faking the nested formGroups
      component.formGroup.addControl('project', new FormControl({}));
      component.formGroup.addControl('app', new FormControl({}));
      component.formGroup.addControl('db', new FormControl({}));

      component.onSubmit();

      expect(initNewProjectSpy).toHaveBeenCalled();
      expect(openSpy).toHaveBeenCalled();
    });
  });
});
