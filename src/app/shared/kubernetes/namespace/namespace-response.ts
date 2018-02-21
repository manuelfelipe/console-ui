export interface NamespaceResponse {
  metadata: {
    name: string;
    selfLink: string;
    uid: string;
    resourceVersion: string;
    creationTimestamp: string;
    labels?: {
      name?: string;
      project?: string;
    };
    annotations?: {
      'drone/author'?: string;
      'drone/build_number'?: string;
      'drone/commit_branch'?: string;
      'drone/commit_sha'?: string;
      'drone/remote_url'?: string;
      'drone/repo'?: string;
      'addons.k8s.io/core'?: string;
      'addons.k8s.io/kube-dns'?: string;
      'addons.k8s.io/dns-controller'?: string;
      'kubectl.kubernetes.io/last-applied-configuration'?: string;
    }
  };
  spec: {
    finalizers: string[]
  };
  status: {
    phase: string;
  };
}
