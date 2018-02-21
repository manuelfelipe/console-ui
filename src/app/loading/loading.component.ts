import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {

  @Input() size: 'xs' | 'sm' | 'lg' = 'sm';
  @Input() isLoading = false;

}
