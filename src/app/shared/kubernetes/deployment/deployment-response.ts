export interface DeploymentResponse {
  metadata: {
    name: string;
    namespace: string;
    selfLink: string;
    uid: string;
    resourceVersion: string;
    generation: number;
    creationTimestamp: string;
    labels?: {
      name?: string;
      project?: string;
    };
    annotations?: {
      'deployment.kubernetes.io/revision'?: string;
      'kubectl.kubernetes.io/last-applied-configuration'?: string;
    }
  };
  spec: {
    replicas: number;
    selector: any;
    template: {
      metadata: any;
      spec: {
        volumes: any;
        containers: [{
          name: string;
          image: string;
          [key: string]: any;
        }]
        [key: string]: any;
      };
    };
    strategy: any;
    minReadySeconds: number;
  };
  status: any;
}
