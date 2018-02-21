// pending = 1, because 0 was considered false
export enum BuildStatus {
  skipped = 1, pending, running, success, failure, killed, error,
}
