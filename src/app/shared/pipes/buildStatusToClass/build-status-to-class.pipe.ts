import { Pipe, PipeTransform } from '@angular/core';

// Drone returns build statuses as `success`, `failure`, `killed`, `pending`, or `running`
// This pipe maps each of the statuses with Bootstrap classes

@Pipe({
  name: 'buildStatusToClass'
})
export class BuildStatusToClassPipe implements PipeTransform {

  transform(status: string, args?: any): any {
    if (status === 'success') {
      return 'success';
    }

    if (status === 'failure' || status === 'killed') {
      return 'danger';
    }

    if (status === 'pending' || status === 'running') {
      return 'warning';
    }

    return 'unknown';
  }

}
