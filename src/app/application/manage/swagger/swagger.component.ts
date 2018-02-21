import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SwaggerUIBundle, SwaggerUIStandalonePreset } from 'swagger-ui-dist';
import { ProjectManager } from '../../../shared/project/project.manager';
import { SwaggerService } from '../../../shared/swagger/swagger.service';
import { SwaggerRequestFactory } from '../../../shared/swagger/swagger-request.factory';

@Component({
  selector: 'app-swagger',
  templateUrl: './swagger.component.html',
  styleUrls: ['./swagger.component.scss']
})
export class SwaggerComponent implements AfterViewInit, OnDestroy {

  isLoading = false;
  hasErred = false;

  sub: Subscription;

  constructor(private swaggerService: SwaggerService,
              private swaggerRequestFactory: SwaggerRequestFactory,
              private projectManager: ProjectManager) {
  }

  ngAfterViewInit() {
    this.sub = this.projectManager.namespace
      .filter(namespace => !!namespace)
      .map(namespace => this.swaggerRequestFactory.toGetSwaggerFileRequest(namespace))
      .mergeMap(request => this.swaggerService.getSwaggerFile(request))
      // .map(() => 'http://petstore.swagger.io/v2/swagger.yaml') // locally only
      .finally(() => this.isLoading = false)
      .do(console.log)
      .subscribe(swaggerFile => {
        const swaggerUiElement = document.getElementById('swagger-ui');

        const ui = SwaggerUIBundle({
          spec: swaggerFile,
          domNode: swaggerUiElement,
          presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
          ],
          plugins: [
            SwaggerUIBundle.plugins.DownloadUrl,
            () => {
              return {
                components: {
                  Topbar: () => null,
                }
              };
            }
          ]
        });

        // Fix icons not showing up
        // https://github.com/swagger-api/swagger-ui/issues/3578
        setTimeout(() => {
          const authorizeButton = swaggerUiElement.getElementsByClassName('btn authorize unlocked')[0];
          if (authorizeButton) {
            authorizeButton.innerHTML = 'Authorize <div class="d-inline-block icon-basic-lock-open"></div>';

            // once we open the modal, add an X to the close-modal button
            authorizeButton.addEventListener('click', () => {
              setTimeout(() => {
                const closeModalButton = document.getElementsByClassName('close-modal')[0];
                if (closeModalButton) {
                  closeModalButton.innerHTML = 'x';
                }
              }, 100);
            });
          }
        }, 500);
      }, () => {
        this.hasErred = true; // no swagger url for this namespace, show a message accordingly
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
