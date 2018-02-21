import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-live-button',
  templateUrl: './live-button.component.html',
  styleUrls: ['./live-button.component.scss']
})
export class LiveButtonComponent {

  @Input() isLive = false;
  @Output() liveChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  onClick(): void {
    this.isLive = !this.isLive;
    this.liveChanged.emit(this.isLive);
  }
}
