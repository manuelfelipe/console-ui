import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-copy-to-clipboard',
  templateUrl: './copy-to-clipboard.component.html',
  styleUrls: ['./copy-to-clipboard.component.scss'],
})
export class CopyToClipboardComponent {

  @Input() content: string;
  isCopied = false;

  copySuccessful(): void {
    this.isCopied = true;

    // after 1 second, set isCopied to false
    setTimeout(() => this.isCopied = false, 1000);
  }
}
