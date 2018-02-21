import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-number-card',
  templateUrl: './number-card.component.html',
  styleUrls: ['./number-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberCardComponent {

  @Input() value = 0;         // increments from 0 to <value>
  @Input() format = '1.0-2';  // increments from 0 to <value>
  @Input() label: string;     // appears below the circle
  @Input() unit: string;      // appended to value in <small>

  @Input() size: 'sm' | 'lg' = 'sm';
  @Input() outline = false;   // outline: bordered and white background
  @Input() type: 'default' | 'success' | 'info' | 'warning' | 'danger' = 'default';
  @Input() color: string;     // if color is specified, type is ignored

  counto = 0;
}
