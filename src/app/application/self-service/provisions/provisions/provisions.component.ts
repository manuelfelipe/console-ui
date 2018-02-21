import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { isCurrentBeaverUser } from '../../../../shared/user/user.beavers';
import { ProvisionsService } from '../../../../shared/provisions/provisions.service';
import { ProvisionsRequestFactory } from '../../../../shared/provisions/provisions-request.factory';
import { ToastrService } from '../../../../shared/toastr/toastr.service';

@Component({
  selector: 'app-provisions',
  templateUrl: './provisions.component.html'
})
export class ProvisionsComponent implements OnInit {

  formGroup: FormGroup;
  isCurrentBeaverUser: Function = isCurrentBeaverUser;

  @ViewChild('successModal') successModal: ElementRef;

  constructor(private provisionsService: ProvisionsService,
              private provisionsRequestFactory: ProvisionsRequestFactory,
              private toastrService: ToastrService,
              private ngbModal: NgbModal) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({});
  }

  onSubmit(): void {
    const values = this.formGroup.value;
    const request = this.provisionsRequestFactory.toInitNewProjectRequest(values.project.owner, values.project.repo, values);

    this.provisionsService.initNewProject(request).first()
      .subscribe(() => this.ngbModal.open(this.successModal, { size: 'lg', backdrop: 'static' }),
        () => this.toastrService.error('Error Initializing New Project'));

  }
}
