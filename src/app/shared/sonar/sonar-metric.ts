export interface SonarMetrics {
  id: string;
  key: string;
  name: string;
  qualifier: string;
  metrics: SonarMetric[];
  url: string;
}

interface SonarMetric {
  metric: string; // coverage, score, etc
  value: string;
}
