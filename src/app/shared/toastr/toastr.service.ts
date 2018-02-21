import { Injectable } from '@angular/core';
import { ToasterService } from 'angular2-toaster';

@Injectable()
export class ToastrService {

  constructor(private toasterService: ToasterService) {
  }

  success(title?: string, body?: string): void {
    this.toasterService.popAsync('success', title, body);
  }

  info(title?: string, body?: string): void {
    this.toasterService.popAsync('info', title, body);
  }

  warning(title?: string, body?: string): void {
    this.toasterService.popAsync('warning', title, body);
  }

  error(title?: string, body?: string): void {
    this.toasterService.popAsync('error', title, body);
  }

  wait(title?: string, body?: string): void {
    this.toasterService.popAsync('wait', title, body);
  }

}
