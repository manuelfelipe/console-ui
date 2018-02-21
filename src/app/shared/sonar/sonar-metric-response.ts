export interface SonarMetricsResponse {
  metrics: {
    component: {
      id: string;
      key: string;
      name: string;
      qualifier: string;
      measures: SonarMetricResponse[];
    };
  };
  url: string;
}

interface SonarMetricResponse {
  metric: string; // coverage, score, etc
  value: string;
  periods?: SonarPeriod[];
}

interface SonarPeriod {
  index: number;
  value: string;
}
