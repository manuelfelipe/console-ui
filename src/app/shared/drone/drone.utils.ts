import { get } from 'lodash';
import { Build } from './build/build';
import { BuildStatus } from './build/build-status';

export const isBuildInProgress = (build: Build): boolean => {
  const buildStatus = get(build, 'status', null);
  return !!buildStatus && (buildStatus === BuildStatus.pending || buildStatus === BuildStatus.running);
};
