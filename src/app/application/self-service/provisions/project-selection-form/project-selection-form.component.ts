import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { BitbucketService } from '../../../../shared/bitbucket/bitbucket.service';
import { BitbucketProject } from '../../../../shared/bitbucket/bitbucket-project';
import { BitbucketRepository } from '../../../../shared/bitbucket/bitbucket-repository';
import { BitbucketRequestFactory } from '../../../../shared/bitbucket/bitbucket-request.factory';

@Component({
  selector: 'app-project-selection-form',
  templateUrl: './project-selection-form.component.html',
  styleUrls: ['./project-selection-form.component.scss']
})
export class ProjectSelectionFormComponent implements OnInit, OnDestroy {

  @Output() formChanged: EventEmitter<FormGroup> = new EventEmitter();

  projects: BitbucketProject[] = [];
  repos: BitbucketRepository[] = [];

  isLoading = false;
  formGroup: FormGroup;
  sub: Subscription;
  ownerSub: Subscription;

  constructor(private bitbucketService: BitbucketService,
              private bitbucketRequestFactory: BitbucketRequestFactory,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    // first, get all projects
    this.bitbucketService.getProjects().first()
      .subscribe(projects => this.projects = projects.values);

    this.formGroup = this.fb.group({
      owner: [null, Validators.required],
      repo: [null, Validators.required],
    });

    // emit initial values
    this.formChanged.emit(this.formGroup);

    // each time we change owner, get new repos
    // switchMap to cancel last request
    this.ownerSub = this.formGroup.get('owner').valueChanges
      .do(() => this.isLoading = true)
      .map(owner => this.bitbucketRequestFactory.toGetProjectReposRequest(owner, true))
      .switchMap(request => this.bitbucketService.getProjectRepos(request))
      .map(repos => repos.values)
      .do(() => this.isLoading = false)
      .subscribe(repos => this.repos = repos);

    // we emit the whole formGroup, to share its validity as well
    this.sub = this.formGroup.valueChanges
      .subscribe(value => this.formChanged.emit(this.formGroup));
  }

  onProjectSelect(projectKey: string): void {
    this.formGroup.get('owner').patchValue(projectKey);
    this.formGroup.get('repo').patchValue(null);
  }

  ngOnDestroy() {
    // emit null to remove formControl
    this.formChanged.emit(null);

    if (this.sub) {
      this.sub.unsubscribe();
    }

    if (this.ownerSub) {
      this.ownerSub.unsubscribe();
    }
  }
}
