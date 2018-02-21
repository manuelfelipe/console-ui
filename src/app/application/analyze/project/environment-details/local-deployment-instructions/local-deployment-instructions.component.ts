import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Deployment } from '../../../../../shared/kubernetes/deployment/deployment';

@Component({
  selector: 'app-local-deployment-instructions',
  templateUrl: './local-deployment-instructions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocalDeploymentInstructionsComponent {

  @Input() deployment: Deployment;

}
