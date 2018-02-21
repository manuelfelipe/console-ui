/* tslint:disable max-line-length */

/*
 Pending: The Pod has been accepted by the Kubernetes system, but one or more of the Container images has not been created. This includes time before being scheduled as well as time spent downloading images over the network, which could take a while.
 Running: The Pod has been bound to a node, and all of the Containers have been created. At least one Container is still running, or is in the process of starting or restarting.
 Succeeded: All Containers in the Pod have terminated in success, and will not be restarted.
 Failed: All Containers in the Pod have terminated, and at least one Container has terminated in failure. That is, the Container either exited with non-zero status or was terminated by the system.
 Unknown: For some reason the state of the Pod could not be obtained, typically due to an error in communicating with the host of the Pod.
 */
export enum PodStatus {
  Pending,
  Running,
  Succeeded,
  Failed,
  Unknown,
}
