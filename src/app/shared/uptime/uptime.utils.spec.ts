import { daysToSeconds, getUptimesStatusSeverity } from './uptime.utils';
import { UptimeService } from './uptime-service';

describe('UptimeUtils Tests', () => {
  describe('daysToSeconds', () => {
    it('should return 0 if passed null', () => {
      const seconds = daysToSeconds(null);
      expect(seconds).toBe(0);
    });

    it('should return 86400 if passed 1 day', () => {
      const seconds = daysToSeconds(1);
      expect(seconds).toBe(86400);
    });

    it('should return 172800 if passed 2 days', () => {
      const seconds = daysToSeconds(2);
      expect(seconds).toBe(172800);
    });
  });

  describe('getUptimesStatusSeverity', () => {
    it('should return success if passed null', () => {
      const severity = getUptimesStatusSeverity(null);
      expect(severity).toBe('success');
    });

    it('should return success if passed empty array', () => {
      const severity = getUptimesStatusSeverity([]);
      expect(severity).toBe('success');
    });

    it('should return success if all services pass', () => {
      const services = [
        {
          description: 'Kubernetes Dev',
          status_public: 0,
        },
        {
          description: 'Kubernetes Prod',
          status_public: 0,
        },
      ] as UptimeService[];

      const severity = getUptimesStatusSeverity(services);
      expect(severity).toBe('success');
    });

    it('should return warning if passed failing services', () => {
      const services = [
        {
          description: 'Random Dev',
          status_public: 1,
        },
      ] as UptimeService[];

      const severity = getUptimesStatusSeverity(services);
      expect(severity).toBe('warning');
    });

    it('should return danger if passed failing Kubernetes service', () => {
      const services = [
        {
          description: 'Kubernetes Dev',
          kind: 'Kubernetes',
          status_public: 1,
        },
      ] as UptimeService[];

      const severity = getUptimesStatusSeverity(services);
      expect(severity).toBe('danger');
    });

    it('should return warning if passed failing prod service and non-prod service', () => {
      const services = [
        {
          description: 'Some Service Prod',
          status_public: 1,
        },
        {
          description: 'Another Service Dev',
          status_public: 1,
        },
      ] as UptimeService[];

      const severity = getUptimesStatusSeverity(services);
      expect(severity).toBe('danger');
    });
  });
});
