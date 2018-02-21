import { Component, Input } from '@angular/core';
import { Pod } from '../../../../../../shared/kubernetes/pod/pod';

@Component({
  selector: 'app-pod-restarts',
  templateUrl: './pod-restarts.component.html'
})
export class PodRestartsComponent {

  @Input() pod: Pod;

}
