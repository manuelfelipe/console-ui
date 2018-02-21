import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ProjectSelectionFormComponent } from './project-selection-form.component';
import { BITBUCKET_SERVICE_MOCK_PROVIDER } from '../../../../shared/bitbucket/bitbucket.service.mock';
import { BitbucketService } from '../../../../shared/bitbucket/bitbucket.service';
import { BitbucketRequestFactory } from '../../../../shared/bitbucket/bitbucket-request.factory';
import { BITBUCKET_PROJECTS_RESPONSE } from '../../../../shared/bitbucket/bitbucket-projects.data';
import { BITBUCKET_REPOSITORIES_RESPONSE } from '../../../../shared/bitbucket/bitbucket-repositories.data';
import Spy = jasmine.Spy;

describe('ProjectSelectionFormComponent', () => {
  let component: ProjectSelectionFormComponent;
  let fixture: ComponentFixture<ProjectSelectionFormComponent>;

  let bitbucketService: BitbucketService;
  let emitSpy: Spy;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(ProjectSelectionFormComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [ProjectSelectionFormComponent],
        providers: [
          BITBUCKET_SERVICE_MOCK_PROVIDER,
          BitbucketRequestFactory,
          FormBuilder,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    bitbucketService = TestBed.get(BitbucketService);
    spyOn(bitbucketService, 'getProjects').and.returnValue(Observable.of(BITBUCKET_PROJECTS_RESPONSE));
    spyOn(bitbucketService, 'getProjectRepos').and.returnValue(Observable.of(BITBUCKET_REPOSITORIES_RESPONSE));

    fixture = TestBed.createComponent(ProjectSelectionFormComponent);
    component = fixture.componentInstance;
    emitSpy = spyOn(component.formChanged, 'emit');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set projects properly', () => {
      expect(component.projects).toEqual(BITBUCKET_PROJECTS_RESPONSE.values);
    });

    it('should init form with null owner/repo', () => {
      expect(component.formGroup.value).toEqual({
        owner: null,
        repo: null,
      });
    });

    it('should emit formGroup on valueChanges', () => {
      expect(emitSpy).toHaveBeenCalledWith(component.formGroup);
      component.formGroup.patchValue({ type: 'MySQL' });

      expect(emitSpy).toHaveBeenCalledWith(component.formGroup);
    });
  });

  describe('onProjectSelect', () => {
    it('should set owner and unset repo', () => {
      expect(component.repos).toEqual([]);
      component.onProjectSelect('CLOUD');

      expect(component.formGroup.value.owner).toEqual('CLOUD');
      expect(component.formGroup.value.repo).toEqual(null);
      expect(component.repos).toEqual(BITBUCKET_REPOSITORIES_RESPONSE.values);
    });
  });
});
