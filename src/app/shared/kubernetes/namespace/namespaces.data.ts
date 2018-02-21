import { NamespaceResponse } from './namespace-response';

/* tslint:disable */
export const KUBERNETES_NAMESPACES: NamespaceResponse[] = [
  {
    "metadata": {
      "name": "alch-test",
      "selfLink": "/api/v1/namespaces/alch-test",
      "uid": "c9990eec-1cf6-11e6-a7c0-12ea718e4fbd",
      "resourceVersion": "315154",
      "creationTimestamp": "2016-05-18T12:48:15Z",
      "labels": {
        "name": "alch-test"
      }
    },
    "spec": {
      "finalizers": [
        "kubernetes"
      ]
    },
    "status": {
      "phase": "Active"
    }
  },
  {
    "metadata": {
      "name": "ams",
      "selfLink": "/api/v1/namespaces/ams",
      "uid": "294fcebe-f48e-11e6-9201-126f8629c640",
      "resourceVersion": "69209631",
      "creationTimestamp": "2017-02-16T21:23:29Z",
      "labels": {
        "project": "ams-ams"
      },
      "annotations": {
        "drone/author": "Jean-Philippe Ricard",
        "drone/build_number": "743",
        "drone/commit_branch": "master",
        "drone/commit_sha": "5eb4add344d39a025be6d6c8f870fbffee41a8a1",
        "drone/remote_url": "https://git.thecloud.com/scm/shared-services/ams.git",
        "drone/repo": "SHARED-SERVICES/ams",
        "kubectl.kubernetes.io/last-applied-configuration": "{\"kind\":\"Namespace\",\"apiVersion\":\"v1\",\"metadata\":{\"name\":\"ams\",\"creationTimestamp\":null,\"labels\":{\"project\":\"ams-ams\"},\"annotations\":{\"drone/author\":\"Jean-Philippe Ricard\",\"drone/build_number\":\"743\",\"drone/commit_branch\":\"master\",\"drone/commit_sha\":\"5eb4add344d39a025be6d6c8f870fbffee41a8a1\",\"drone/remote_url\":\"https://git.thecloud.com/scm/shared-services/ams.git\",\"drone/repo\":\"SHARED-SERVICES/ams\"}},\"spec\":{},\"status\":{}}"
      }
    },
    "spec": {
      "finalizers": [
        "kubernetes"
      ]
    },
    "status": {
      "phase": "Active"
    }
  },
  {
    "metadata": {
      "name": "bc-account-mnt",
      "selfLink": "/api/v1/namespaces/bc-account-mnt",
      "uid": "bd8b8ec4-ee42-11e6-84f0-0e8f2a52ea32",
      "resourceVersion": "89613420",
      "creationTimestamp": "2017-02-08T21:08:29Z",
      "labels": {
        "project": "bc-account-mnt-account-mgt-services"
      },
      "annotations": {
        "drone/author": "Karim Bouchouicha",
        "drone/build_number": "4",
        "drone/commit_branch": "master",
        "drone/commit_sha": "6e7463786c4495497eb23b4970345745add70746",
        "drone/remote_url": "https://git.thecloud.com/scm/bc/account-mgt-services.git",
        "drone/repo": "BC/account-mgt-services",
        "kubectl.kubernetes.io/last-applied-configuration": "{\"kind\":\"Namespace\",\"apiVersion\":\"v1\",\"metadata\":{\"name\":\"bc-account-mnt\",\"creationTimestamp\":null,\"labels\":{\"project\":\"bc-account-mnt-account-mgt-services\"},\"annotations\":{\"drone/author\":\"Karim Bouchouicha\",\"drone/build_number\":\"4\",\"drone/commit_branch\":\"master\",\"drone/commit_sha\":\"6e7463786c4495497eb23b4970345745add70746\",\"drone/remote_url\":\"https://git.thecloud.com/scm/bc/account-mgt-services.git\",\"drone/repo\":\"BC/account-mgt-services\"}},\"spec\":{},\"status\":{}}"
      }
    },
    "spec": {
      "finalizers": [
        "kubernetes"
      ]
    },
    "status": {
      "phase": "Active"
    }
  },
  {
    "metadata": {
      "name": "bc-account-mnt-develop",
      "selfLink": "/api/v1/namespaces/bc-account-mnt-develop",
      "uid": "35d0d68f-0f11-11e7-83e8-0aa1f862bf80",
      "resourceVersion": "101719770",
      "creationTimestamp": "2017-03-22T15:07:04Z",
      "labels": {
        "project": "bc-account-mnt-develop-ssp-services"
      },
      "annotations": {
        "drone/author": "Michael Serpieri",
        "drone/build_number": "1",
        "drone/commit_branch": "develop",
        "drone/commit_sha": "31304cf186f6d8e3b85b13d2652fb57606bc6cb6",
        "drone/remote_url": "https://git.thecloud.com/scm/bc/ssp-services.git",
        "drone/repo": "BC/ssp-services",
        "kubectl.kubernetes.io/last-applied-configuration": "{\"kind\":\"Namespace\",\"apiVersion\":\"v1\",\"metadata\":{\"name\":\"bc-account-mnt-develop\",\"creationTimestamp\":null,\"labels\":{\"project\":\"bc-account-mnt-develop-ssp-services\"},\"annotations\":{\"drone/author\":\"Michael Serpieri\",\"drone/build_number\":\"1\",\"drone/commit_branch\":\"develop\",\"drone/commit_sha\":\"31304cf186f6d8e3b85b13d2652fb57606bc6cb6\",\"drone/remote_url\":\"https://git.thecloud.com/scm/bc/ssp-services.git\",\"drone/repo\":\"BC/ssp-services\"}},\"spec\":{},\"status\":{}}"
      }
    },
    "spec": {
      "finalizers": [
        "kubernetes"
      ]
    },
    "status": {
      "phase": "Active"
    }
  },
  {
    "metadata": {
      "name": "bc-account-mnt-qa",
      "selfLink": "/api/v1/namespaces/bc-account-mnt-qa",
      "uid": "39c6e7bd-08ed-11e7-9d9b-126f8629c640",
      "resourceVersion": "89614196",
      "creationTimestamp": "2017-03-14T19:34:22Z",
      "labels": {
        "project": "bc-account-mnt-qa-account-mgt-services"
      },
      "annotations": {
        "drone/author": "Michael Serpieri",
        "drone/build_number": "5",
        "drone/commit_branch": "release/qa",
        "drone/commit_sha": "4aa8b88212778cba7a8856b244017611ba4297ef",
        "drone/remote_url": "https://git.thecloud.com/scm/bc/account-mgt-services.git",
        "drone/repo": "BC/account-mgt-services",
        "kubectl.kubernetes.io/last-applied-configuration": "{\"kind\":\"Namespace\",\"apiVersion\":\"v1\",\"metadata\":{\"name\":\"bc-account-mnt-qa\",\"creationTimestamp\":null,\"labels\":{\"project\":\"bc-account-mnt-qa-account-mgt-services\"},\"annotations\":{\"drone/author\":\"Michael Serpieri\",\"drone/build_number\":\"5\",\"drone/commit_branch\":\"release/qa\",\"drone/commit_sha\":\"4aa8b88212778cba7a8856b244017611ba4297ef\",\"drone/remote_url\":\"https://git.thecloud.com/scm/bc/account-mgt-services.git\",\"drone/repo\":\"BC/account-mgt-services\"}},\"spec\":{},\"status\":{}}"
      }
    },
    "spec": {
      "finalizers": [
        "kubernetes"
      ]
    },
    "status": {
      "phase": "Active"
    }
  },
];
