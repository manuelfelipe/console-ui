import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { split } from 'lodash';

@Component({
  selector: 'app-namespace-config-management-breadcrumb',
  templateUrl: './namespace-config-management-breadcrumb.component.html',
  styleUrls: ['./namespace-config-management-breadcrumb.component.scss']
})
export class NamespaceConfigManagementBreadcrumbComponent implements OnChanges {

  @Input() selectedKey = '';
  @Output() keyNavClickedEmitter = new EventEmitter<string>();

  splitSelectedKeys: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedKey) {
      this.splitSelectedKeys = this.selectedKey ? split(this.selectedKey, '/') : [];
    }
  }

  onKeyNavClicked(idx: number): boolean {
    let key = this.splitSelectedKeys.slice(0, (idx + 1)).join('/');

    // if it's not a folder, re-append a slash
    if (idx < (this.splitSelectedKeys.length - 1)) {
      key += '/';
    }

    this.keyNavClickedEmitter.emit(key);
    return false;
  }
}
