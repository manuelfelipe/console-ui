import { DeploymentResponse } from './deployment-response';

/* tslint:disable */
export const KUBERNETES_DEPLOYMENTS: DeploymentResponse[] = [
  {
    metadata: {
      name: 'status',
      namespace: 'status',
      selfLink: '/apis/extensions/v1beta1/namespaces/status/deployments/status',
      uid: '9725a0dd-f391-11e6-84f0-0e8f2a52ea32',
      resourceVersion: '118076132',
      generation: 59,
      creationTimestamp: '2017-02-15T15:15:31Z',
      labels: {
        project: 'status-status'
      },
      annotations: {
        'deployment.kubernetes.io/revision': '25',
        'kubectl.kubernetes.io/last-applied-configuration': '{"kind":"Deployment","apiVersion":"extensions/v1beta1","metadata":{"name":"status","creationTimestamp":null,"labels":{"project":"status-status"}},"spec":{"replicas":1,"template":{"metadata":{"creationTimestamp":null,"labels":{"project":"status-status"}},"spec":{"volumes":[{"name":"thecloud-io","secret":{"secretName":"pipeline-thecloud-io"}}],"containers":[{"name":"status","image":"gcr.io/thecloud-io/cloud/status:150","ports":[{"name":"web","containerPort":3000,"protocol":"TCP"}],"env":[{"name":"CI","value":"drone"},{"name":"NODE_ENV","value":"prod"}],"resources":{},"volumeMounts":[{"name":"thecloud-io","readOnly":true,"mountPath":"/run/secrets/thecloud.io/"}],"livenessProbe":{"httpGet":{"path":"/health","port":3000},"initialDelaySeconds":5,"timeoutSeconds":5},"imagePullPolicy":"Always"}],"terminationGracePeriodSeconds":10,"dnsPolicy":"ClusterFirst","serviceAccountName":"default"}},"strategy":{"type":"RollingUpdate","rollingUpdate":{"maxUnavailable":0}},"minReadySeconds":5},"status":{}}'
      }
    },
    spec: {
      replicas: 2,
      selector: {
        matchLabels: {
          project: 'status-status'
        }
      },
      template: {
        metadata: {
          creationTimestamp: null,
          labels: {
            project: 'status-status'
          }
        },
        spec: {
          volumes: [
            {
              name: 'thecloud-io',
              secret: {
                secretName: 'pipeline-thecloud-io',
                defaultMode: 420
              }
            }
          ],
          containers: [
            {
              name: 'status',
              image: 'gcr.io/thecloud-io/cloud/status:150',
              ports: [
                {
                  name: 'web',
                  containerPort: 3000,
                  protocol: 'TCP'
                }
              ],
              resources: { },
              volumeMounts: [
                {
                  name: 'thecloud-io',
                  readOnly: true,
                  mountPath: '/run/secrets/thecloud.io/'
                }
              ],
              livenessProbe: {
                httpGet: {
                  path: '/health',
                  port: 3000,
                  scheme: 'HTTP'
                },
                initialDelaySeconds: 5,
                timeoutSeconds: 5,
                periodSeconds: 10,
                successThreshold: 1,
                failureThreshold: 3
              },
              terminationMessagePath: '/dev/termination-log',
              imagePullPolicy: 'Always'
            }
          ],
          restartPolicy: 'Always',
          terminationGracePeriodSeconds: 10,
          dnsPolicy: 'ClusterFirst',
          serviceAccountName: 'default',
          serviceAccount: 'default',
          securityContext: { }
        }
      },
      strategy: {
        type: 'RollingUpdate',
        rollingUpdate: {
          maxUnavailable: 0,
          maxSurge: 1
        }
      },
      minReadySeconds: 5
    },
    status: {
      observedGeneration: 59,
      replicas: 1,
      updatedReplicas: 1,
      availableReplicas: 1
    }
  }
];
