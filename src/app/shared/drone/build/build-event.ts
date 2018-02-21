// pending = 1, because 0 was considered false
export enum BuildEvent {
  push = 1, pull_request, tag, deployment
}
