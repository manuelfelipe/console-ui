const fillLogsArray = (): string[] => {
  const logs = [];

  for (let i = 1; i <= 999; ++i) {
    logs.push(`LOG_#${i}`);
  }

  // 1000th, timestamp will be parsed
  logs.push('2017-09-28T16:23:17.491052676Z LOG_#1000');

  return logs;
};

// fill with 1000 strings as ['LOG_#0', 'LOG_#1', 'LOG_#2', ...]
export const KUBERNETES_POD_LOGS: string[] = fillLogsArray();
