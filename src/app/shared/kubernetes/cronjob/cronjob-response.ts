export interface CronJobResponse {
  metadata: {
    name: string;
    namespace: string;
    selfLink: string;
    uid: string;
    resourceVersion: string;
    creationTimestamp: string;
    labels?: {
      run?: string;
    };
    annotations?: {
      username: string;
      urls: string; // array, but comma separated
    }
  };
  spec: {
    schedule: string;
    concurrencyPolicy: string;
    suspend: boolean;
    jobTemplate: {
      metadata: {
        creationTimestamp: string;
      };
      spec: {
        template: {
          metadata: {
            creationTimestamp: string;
            labels: {
              run: string;
            }
          };
          spec: {
            containers: {
              name: string;
              image: string;
              args: string[];
              resources: any;
              terminationMessagePath: string;
              terminationMessagePolicy: string;
              imagePullPolicy: string;
            }[];
            restartPolicy: string;
            terminationGracePeriodSeconds: number;
            dnsPolicy: string;
            securityContext: any;
            schedulerName: string;
          }
        }
      }
    }
  };
  status: {
    lastScheduleTime: string;
  };
}
