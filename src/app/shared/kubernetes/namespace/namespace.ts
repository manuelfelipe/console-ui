export interface Namespace {
  name: string;
  uid: string;
  createdAt: Date;
  annotations?: Annotations;
  status: string;
}

interface Annotations {
  'drone/author': string;
  'drone/build_number': number;
  'drone/commit_branch': string;
  'drone/repo': string;
}
