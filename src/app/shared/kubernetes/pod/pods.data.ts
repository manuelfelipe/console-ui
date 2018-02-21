import { PodResponse } from './pod-response';

/* tslint:disable */
export const KUBERNETES_PODS: PodResponse[] = [
  {
    metadata: {
      name: "yp-shopwisegms-3926478594-1smsa",
      generateName: "yp-shopwisegms-3926478594-",
      namespace: "yp-shopwisegms",
      selfLink: "/api/v1/namespaces/yp-shopwisegms/pods/yp-shopwisegms-3926478594-1smsa",
      uid: "7e5498d6-4af7-11e7-9d9b-126f8629c640",
      resourceVersion: "121580798",
      creationTimestamp: "2017-06-06T20:34:09Z",
      labels: {
        'pod-template-hash': "3926478594",
        project: "yp-shopwisegms-gms"
      },
      annotations: {
        'kubernetes.io/created-by': `{"kind":"SerializedReference","apiVersion":"v1","reference":{"kind":"ReplicaSet","namespace":"yp-shopwisegms","name":"yp-shopwisegms-3926478594","uid":"2db1eaed-4af7-11e7-9d9b-126f8629c640","apiVersion":"extensions","resourceVersion":"121580634"}}`
      },
      ownerReferences: [
        {
          apiVersion: "extensions/v1beta1",
          kind: "ReplicaSet",
          name: "yp-shopwisegms-3926478594",
          uid: "2db1eaed-4af7-11e7-9d9b-126f8629c640",
          controller: true
        }
      ]
    },
    spec: {
      volumes: [
        {
          name: "thecloud-io",
          secret: {
            secretName: "pipeline-thecloud-io",
            defaultMode: 420
          }
        },
        {
          name: "default-token-afgb2",
          secret: {
            secretName: "default-token-afgb2",
            defaultMode: 420
          }
        }
      ],
      containers: [],
      restartPolicy: "Always",
      terminationGracePeriodSeconds: 10,
      dnsPolicy: "ClusterFirst",
      serviceAccountName: "default",
      serviceAccount: "default",
      nodeName: "ip-172-20-0-112.ec2.internal",
      securityContext: {}
    },
    status: {
      phase: "Running",
      conditions: [
        {
          type: "Initialized",
          status: "True",
          lastProbeTime: null,
          lastTransitionTime: "2017-06-06T20:34:09Z"
        },
        {
          type: "Ready",
          status: "True",
          lastProbeTime: null,
          lastTransitionTime: "2017-06-06T20:34:37Z"
        },
        {
          type: "PodScheduled",
          status: "True",
          lastProbeTime: null,
          lastTransitionTime: "2017-06-06T20:34:09Z"
        }
      ],
      hostIP: "172.20.0.112",
      podIP: "10.18.0.225",
      startTime: "2017-06-06T20:34:09Z",
      containerStatuses: [
        {
          name: "yp-shopwisegms",
          state: {
            running: {
              startedAt: "2017-06-06T20:34:37Z"
            }
          },
          lastState: {
            terminated: {
              exitCode: 137,
              reason: "OOMKilled",
              startedAt: null,
              finishedAt: "2017-07-24T16:59:48Z",
              containerID: "docker://8f06bc56975a822037fbe71151e7c0411c01d3689cc6047703e3dab3460a6610"
            }
          },
          ready: true,
          restartCount: 12,
          image: "gcr.io/thecloud-io/yp-shopwise/gms:497",
          imageID: "docker://sha256:093f3c981d3bc790bc54d158101a45ccfdec6a9439aeb5b8a3774b40b570c636",
          containerID: "docker://776cac867d4859503f2c28a16fd96b320ac519666f1a054705d2f60b81860f69"
        },
        {
          name: "yp-shopwisegms-2",
          state: {
            running: {
              startedAt: "2017-06-06T20:34:37Z"
            }
          },
          lastState: {},
          ready: true,
          restartCount: 12,
          image: "gcr.io/thecloud-io/yp-shopwise/gms:497",
          imageID: "docker://sha256:093f3c981d3bc790bc54d158101a45ccfdec6a9439aeb5b8a3774b40b570c636",
          containerID: "docker://776cac867d4859503f2c28a16fd96b320ac519666f1a054705d2f60b81860f69"
        },
      ]
    }
  },
];
