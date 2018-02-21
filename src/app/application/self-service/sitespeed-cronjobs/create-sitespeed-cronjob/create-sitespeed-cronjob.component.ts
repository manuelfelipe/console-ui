import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { difference, find } from 'lodash';
import { CronJob } from '../../../../shared/kubernetes/cronjob/cronjob';
import { SiteSpeedService } from '../../../../shared/sitespeed/sitespeed.service';
import { SiteSpeedRequestFactory } from '../../../../shared/sitespeed/sitespeed-request.factory';
import { KubernetesResponseFactory } from '../../../../shared/kubernetes/kubernetes-response.factory';
import { ToastrService } from '../../../../shared/toastr/toastr.service';

@Component({
  selector: 'app-create-sitespeed-cronjob',
  templateUrl: './create-sitespeed-cronjob.component.html'
})
export class CreateSitespeedCronjobComponent implements OnInit {

  @Input() cronjob: CronJob;
  @Output() onCreate: EventEmitter<CronJob> = new EventEmitter<CronJob>();

  formGroup: FormGroup;

  private lowercaseAlphaNumeric: RegExp = /^[a-z]([-a-z0-9]*[a-z])$/;
  private at12DailySchedule = '0 0 * * *';
  private initialArgs: string[] = ['-b', 'chrome', '--speedIndex', '--html.showAllWaterfallSummary'];

  schedules = [
    {
      label: 'Every 3 hours',
      cron: '0 */3 * * *'
    },
    {
      label: 'Daily',
      cron: '0 0 * * *'
    },
    {
      label: 'Weekly',
      cron: '0 0 * * MON'
    },
    {
      label: 'Monthly',
      cron: '0 0 1 * *'
    },
    {
      label: 'Yearly',
      cron: '0 0 1 1 *'
    }
  ];

  isCustomSchedule = false;
  selectedSchedule = this.schedules[1];

  constructor(private siteSpeedService: SiteSpeedService,
              private siteSpeedRequestFactory: SiteSpeedRequestFactory,
              private kubernetesResponseFactory: KubernetesResponseFactory,
              private toastrService: ToastrService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(this.lowercaseAlphaNumeric)]],
      schedule: [this.at12DailySchedule, Validators.required],
      urls: ['', [Validators.required, validateArgs]],
      args: [this.initialArgs.join('\n'), [Validators.required, validateArgs]],
    });

    if (this.cronjob) {
      this.formGroup.get('name').disable();

      this.formGroup.setValue({
        name: this.cronjob.name,
        schedule: this.cronjob.schedule,
        urls: this.cronjob.urls.join('\n'),
        args: difference(this.cronjob.args, this.cronjob.urls).join('\n'),
      });

      // if cronjob.schedule is custom, enable `isCustomSchedule`
      // otherwise, select the right schedule from dropdown
      const foundSchedule = find(this.schedules, (schedule) => schedule.cron === this.cronjob.schedule);
      if (foundSchedule) {
        this.selectedSchedule = foundSchedule;
      } else {
        this.isCustomSchedule = true;
      }
    }
  }

  selectSchedule(schedule): void {
    this.formGroup.patchValue({ schedule: schedule.cron });

    this.selectedSchedule = schedule;
    this.isCustomSchedule = false;
  }

  create(): void {
    const values = this.formGroup.value;

    const request = this.siteSpeedRequestFactory
      .toCreateCronJobRequest(values.name, values.schedule, this.textareaToArray(values.urls), this.textareaToArray(values.args));

    this.siteSpeedService.createCronJob(request).first()
      .map(response => this.kubernetesResponseFactory.toCronJob(response))
      .subscribe(cronjob => {
          this.onCreate.emit(cronjob);
          this.toastrService.success(`CronJob ${cronjob.name} successfully created`);
        },
        () => this.toastrService.error('Error creating CronJob. Please try again.'));
  }

  update(): void {
    const values = this.formGroup.value;

    const request = this.siteSpeedRequestFactory
      .toUpdateCronJobRequest(this.cronjob.name, values.schedule, this.textareaToArray(values.urls), this.textareaToArray(values.args));

    this.siteSpeedService.updateCronJob(request).first()
      .map(response => this.kubernetesResponseFactory.toCronJob(response))
      .subscribe(cronjob => {
          this.onCreate.emit(cronjob);
          this.toastrService.success(`CronJob ${cronjob.name} successfully updated`);
        },
        () => this.toastrService.error('Error creating CronJob. Please try again.'));
  }

  private textareaToArray(value: string): string[] {
    if (!value) {
      return [];
    }

    // only push this line if it contains a non whitespace character
    return value.split('\n').filter(line => /\S/.test(line));
  }
}

// if the -* or --* argument is followed by a space or arg, return false
// only 1 argument is allowed per args array element
function validateArgs(c: FormControl): ValidationErrors | null {
  const ILLEGAL_ARG_REGEX = /^(-|--)\S+\s+.*/;
  const ARGS = c.value.split('\n');

  for (let i = 0; i < ARGS.length; ++i) {
    const arg = ARGS[i];

    // if one of the args is illegal, return error
    if (ILLEGAL_ARG_REGEX.test(arg)) {
      return {
        validateArgs: {
          valid: false
        }
      };
    }
  }

  return null;
}
