import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { filter, first, replace, set } from 'lodash';
import { getFileType, isFolder, isProjectKey, isRepositoryKey, isSecretKey } from '../../../../shared/consul/consul.utils';
import { ToastrService } from '../../../../shared/toastr/toastr.service';
import { ConsulService } from '../../../../shared/consul/consul.service';
import { ConsulRequestFactory } from '../../../../shared/consul/consul-request.factory';
import { FileType } from '../../../../shared/consul/file-type';

// dirty hack to support 'ace'
// tests fail otherwise
declare const require: any;
const ace = require('brace');

// import theme and mode for Ace
import 'brace/theme/clouds';
import 'brace/mode/json.js';
import 'brace/mode/yaml.js';

@Component({
  selector: 'app-namespace-config-management-value',
  templateUrl: './namespace-config-management-value.component.html',
  styleUrls: ['./namespace-config-management-value.component.scss']
})
export class NamespaceConfigManagementValueComponent implements AfterViewInit, OnChanges {

  @ViewChild('editor') editor;
  @Input() selectedKey: string;
  @Output() updateKeysEmitter = new EventEmitter<string>();

  newKey: string;
  config: any = '';

  aceTheme = 'clouds'; // 'textmate'; // or `monokai`

  // used in html only
  isFolderUtil = isFolder;
  isProjectUtil = isProjectKey;
  isRepositoryUtil = isRepositoryKey;

  constructor(private consulService: ConsulService,
              private consulRequestFactory: ConsulRequestFactory,
              private toastr: ToastrService) {
  }

  // get rid of `Automatically scrolling cursor into view after selection change this will be disabled in the next version` warning
  ngAfterViewInit(): void {
    set(this.editor, '_editor.$blockScrolling', Infinity);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedKey) {
      this.newKey = null;
      this.config = '';

      // if it's a file, get it's value
      if (!isFolder(this.selectedKey)) {
        const request = this.consulRequestFactory.toGetValuesRequest(this.selectedKey);

        this.consulService.getValue(request)
          .subscribe(config => this.config = config);
      }
    }
  }

  getAceMode(): string {
    if (!this.selectedKey || isFolder(this.selectedKey)) {
      return FileType[getFileType(this.newKey)];
    } else {
      return FileType[getFileType(this.selectedKey)];
    }
  }

  isAceEditorValid(): boolean {
    const annotations = this.editor ? this.editor._editor.getSession().getAnnotations() : [];
    return (annotations.length === 0);
  }

  setConfig(value: string): void {
    if (!this.isAceEditorValid()) {
      alert('Your config contains syntax errors. Please fix them before saving');
      return;
    }

    const key = this.getFullKey();
    const request = this.consulRequestFactory.toSetConfigRequest(key, value);

    this.consulService.setConfig(request)
      .subscribe(() => {
        this.newKey = null;
        this.updateKeysEmitter.emit(key);

        this.toastr.success(null, 'Config successfully saved!');
      }, () => this.toastr.error(null, 'Error saving config. Please try again'));
  }

  deleteSelectedKey(): void {
    const isConfirmed = confirm(`Are you sure you want to delete ${this.selectedKey}?`);

    if (isConfirmed) {
      const request = this.consulRequestFactory.toDeleteConfigRequest(this.selectedKey);

      this.consulService.deleteConfig(request)
        .subscribe(() => {
          const upKey = this.getPreviousFolder(this.selectedKey);
          this.updateKeysEmitter.emit(upKey);
        });
    }
  }

  // if selectedKey is file, ignore newKey
  getFullKey(): string {
    if (isFolder(this.selectedKey)) {
      return filter([this.selectedKey, this.newKey], s => !!s).join('');
    } else {
      return this.selectedKey || this.newKey;
    }
  }

  getPreviousFolder(key: string): string {
    if (first(key) !== '/') {
      key = `/${key}`;
    }

    // match any pattern ending with `pattern/`, `/pattern` or `/pattern/`,
    // and replace it with ``, `` or `/`, respectively
    key = replace(key, /([^/]*\/?)$/, '');

    return (first(key) === '/') ? key.substring(1) : key;
  }

  isSecretKey(): boolean {
    return isSecretKey(this.getFullKey());
  }
}
