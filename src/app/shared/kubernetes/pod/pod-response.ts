export interface PodResponse {
  metadata: {
    name: string;
    generateName: string;
    namespace: string;
    selfLink: string;
    uid: string;
    resourceVersion: string;
    creationTimestamp: string;
    labels?: {
      [key: string]: any;
    };
    annotations?: {
      'kubernetes.io/created-by'?: string;
    };
    ownerReferences: any[];
  };
  spec: {
    volumes: {
      name: string;
      secret: {
        secretName: string;
        defaultMode: number;
      }
    }[];
    containers: PodContainer[];
    restartPolicy: string;
    terminationGracePeriodSeconds: number;
    dnsPolicy: string;
    serviceAccountName: string;
    serviceAccount: string;
    nodeName: string;
    securityContext: any;
  };
  status: PodStatus;
}

interface PodContainer {
  name: string;
  image: string;
  ports: any[];
  // stripped out on server
  env: {
    name: string;
    value: string;
  }[];
  resources: any;
  volumeMounts: any[];
  livenessProbe: any;
  terminationMessagePath: string;
  imagePullPolicy: string;
}

interface PodStatus {
  phase: string;
  conditions: any[];
  hostIP: string;
  podIP: string;
  startTime: string;
  containerStatuses: any[];
}
