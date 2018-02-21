export interface LineChart {
  name: string;
  series: LineChartValue[];
  timestamp?: Date;
}

export interface LineChartValue {
  name: string;
  value: number;
}
