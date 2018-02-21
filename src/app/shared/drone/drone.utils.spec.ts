import { isBuildInProgress } from './drone.utils';
import { BuildResponseFactory } from './build/build-response.factory';
import { BUILDS_RESPONSE } from './build/builds.data';

describe('DroneUtils Tests', () => {
  const processor: BuildResponseFactory = new BuildResponseFactory();
  const BUILDS = processor.toBuilds(BUILDS_RESPONSE);

  describe('isBuildInProgress', () => {
    it('should return false if passed null', () => {
      const is = isBuildInProgress(null);
      expect(is).toBe(false);
    });

    it('should return false if passed successful build', () => {
      const is = isBuildInProgress(BUILDS[0]);
      expect(is).toBe(false);
    });

    it('should return true if passed pending build', () => {
      const is = isBuildInProgress(BUILDS[1]);
      expect(is).toBe(true);
    });

    it('should return true if passed running build', () => {
      const is = isBuildInProgress(BUILDS[2]);
      expect(is).toBe(true);
    });
  });

});
