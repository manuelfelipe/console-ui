export interface NamespaceResources {
  cluster: string;
  resources: NamespaceOrPodResourcesData[];
}

export interface NamespaceOrPodResourcesData {
  type: string; // memory, cpu, etc
  data: {
    latestTimestamp: string;
    metrics: NamespaceResourcesMetrics[];
  };
}

interface NamespaceResourcesMetrics {
  timestamp: string;
  value: number;
}
