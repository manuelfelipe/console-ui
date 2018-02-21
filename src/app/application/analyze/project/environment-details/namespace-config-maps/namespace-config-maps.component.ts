import { Component, OnInit } from '@angular/core';
import { isPlainObject, keys } from 'lodash';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { KubernetesService } from '../../../../../shared/kubernetes/kubernetes.service';
import { KubernetesRequestFactory } from '../../../../../shared/kubernetes/kubernetes-request.factory';

@Component({
  selector: 'app-namespace-config-maps',
  templateUrl: './namespace-config-maps.component.html'
})
export class NamespaceConfigMapsComponent implements OnInit {

  cluster: string;
  namespace: string;

  configMaps: any;
  configMapsHref: SafeUrl;

  private today: number = Date.now();

  constructor(private kubernetesService: KubernetesService,
              private kubernetesRequestFactory: KubernetesRequestFactory,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    const request = this.kubernetesRequestFactory.toGetServiceConfigMapsRequest(this.cluster, this.namespace);

    this.kubernetesService.getServiceConfigMaps(request).first()
      .subscribe(configMaps => {
        if (isPlainObject(configMaps)) {
          keys(configMaps).forEach(key => {
            try {
              configMaps[key] = JSON.parse(configMaps[key]);
            } catch (e) {
              // was not JSON string
            }
          });
        }

        this.configMaps = configMaps;
        this.configMapsHref = this.generateDownloadHref(configMaps);
      });
  }

  generateDownloadHref(configMaps: any): SafeUrl {
    const encoded = encodeURIComponent(JSON.stringify(configMaps, null, 2));
    return this.sanitizer.bypassSecurityTrustUrl(`data:text/json;charset=UTF-8,${encoded}`);
  }

}
