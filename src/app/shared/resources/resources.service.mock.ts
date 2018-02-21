import { Observable } from 'rxjs/Observable';
import { ResourcesService } from './resources.service';
import { NodesResources } from './nodes-resources';
import { NamespaceOrPodResourcesData, NamespaceResources } from './namespace-resources';

class ResourcesServiceMock {

  getNodesResources(): Observable<NodesResources[]> {
    throw new Error('ResourcesServiceMock.getNodesResources unimplemented');
  }

  getNamespaceResources(): Observable<NamespaceResources[]> {
    throw new Error('ResourcesServiceMock.getNamespaceResources unimplemented');
  }

  getPodResources(): Observable<NamespaceOrPodResourcesData[]> {
    throw new Error('ResourcesServiceMock.getPodResources unimplemented');
  }

}

export const RESOURCES_SERVICE_MOCK_PROVIDER = {
  provide: ResourcesService,
  useClass: ResourcesServiceMock,
};
