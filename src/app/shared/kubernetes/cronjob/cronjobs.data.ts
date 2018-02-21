import { CronJobResponse } from './cronjob-response';

/* tslint:disable */
export const KUBERNETES_CRONJOBS: CronJobResponse[] = [
  {
    "metadata": {
      "name": "speed-yp-ca",
      "namespace": "sitespeed",
      "selfLink": "/apis/batch/v2alpha1/namespaces/sitespeed/cronjobs/speed-yp-ca",
      "uid": "d3b0ed6d-af82-11e7-ab9c-42010af000ee",
      "resourceVersion": "565470",
      "creationTimestamp": "2017-10-12T19:23:29Z",
      "labels": { "run": "speed-yp-ca" },
      "annotations": {
        "username": "mmassou1",
        "urls": "https://www.yellowpages.ca/,https://preprod-ui.yellowpages.ca/,https://qa-ui-mtl.yellowpages.ca/"
      }
    },
    "spec": {
      "schedule": "0/60 * * * ?",
      "concurrencyPolicy": "Allow",
      "suspend": false,
      "jobTemplate": {
        "metadata": { "creationTimestamp": null },
        "spec": {
          "template": {
            "metadata": { "creationTimestamp": null, "labels": { "run": "speed-yp-ca" } },
            "spec": {
              "containers": [{
                "name": "speed-yp-ca",
                "image": "sitespeedio/sitespeed.io",
                "args": [
                  "https://www.yellowpages.ca/",
                  "https://preprod-ui.yellowpages.ca/",
                  "https://qa-ui-mtl.yellowpages.ca/",
                  "-b",
                  "chrome",
                  "--speedIndex",
                  "--html.showAllWaterfallSummary"
                ],
                "resources": {},
                "terminationMessagePath": "/dev/termination-log",
                "terminationMessagePolicy": "File",
                "imagePullPolicy": "Always"
              }],
              "restartPolicy": "OnFailure",
              "terminationGracePeriodSeconds": 30,
              "dnsPolicy": "ClusterFirst",
              "securityContext": {},
              "schedulerName": "default-scheduler"
            }
          }
        }
      }
    },
    "status": { "lastScheduleTime": "2017-10-17T18:00:00Z" }
  },
];
