import { TestBed } from '@angular/core/testing';
import { BuildResponseFactory } from './build-response.factory';
import { Build } from './build';
import { BuildStatus } from './build-status';
import { BUILDS_RESPONSE } from './builds.data';
import { BuildEvent } from './build-event';

describe('BuildResponseFactory Tests', () => {
  let responseFactory: BuildResponseFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BuildResponseFactory,
      ],
    });
  });

  beforeEach(() => {
    responseFactory = new BuildResponseFactory();
  });

  it('should be instantiable', () => {
    expect(responseFactory).toBeDefined();
  });

  describe('toBuild', () => {
    it('should return null when null is passed', () => {
      const response = responseFactory.toBuild(null);
      expect(response).toBeNull();
    });

    it('should return correct response', () => {
      const EXPECTED: Build = {
        id: 17544,
        number: 303,
        event: BuildEvent.push,
        status: BuildStatus.success,
        createdAt: new Date(1493844525 * 1000),
        finishedAt: new Date(1493844823 * 1000),
        branch: 'develop',
        message: 'isSoaJSService checks for SOAJS_PROFILE, SOAJS_ENV, and SOAJS_SERVICE_NAME env variables, not just SOAJS_PROFILE',
        author: 'Mark Massoud',
        authorEmail: 'I',
        authorAvatar: 'https://www.gravatar.com/avatar/865c0c0b4ab0e063e5caa3387c1a8741.jpg',
        linkUrl: 'https://git.thecloud.com/projects/CLOUD/repos/dashboard/commits/1550c1ab4df72ce31aa915ed73aabac9cb2063c8',
      };

      const response = responseFactory.toBuild(BUILDS_RESPONSE[0]);
      expect(response).toEqual(EXPECTED);

      // more tests on the date conversion
      expect(response.createdAt.getFullYear()).toBe(2017);
    });
  });

  describe('toBuilds', () => {
    it('should return [] when null is passed', () => {
      const response = responseFactory.toBuilds(null);
      expect(response).toEqual([]);
    });

    it('should return correct response', () => {
      const EXPECTED: Build[] = [
        {
          id: 17544,
          number: 303,
          event: BuildEvent.push,
          status: BuildStatus.success,
          createdAt: new Date(1493844525 * 1000),
          finishedAt: new Date(1493844823 * 1000),
          branch: 'develop',
          message: 'isSoaJSService checks for SOAJS_PROFILE, SOAJS_ENV, and SOAJS_SERVICE_NAME env variables, not just SOAJS_PROFILE',
          author: 'Mark Massoud',
          authorEmail: 'I',
          authorAvatar: 'https://www.gravatar.com/avatar/865c0c0b4ab0e063e5caa3387c1a8741.jpg',
          linkUrl: 'https://git.thecloud.com/projects/CLOUD/repos/dashboard/commits/1550c1ab4df72ce31aa915ed73aabac9cb2063c8',
        },
        {
          id: 17541,
          number: 302,
          event: BuildEvent.pull_request,
          status: BuildStatus.pending,
          createdAt: new Date(1493843912 * 1000),
          finishedAt: new Date(1493844214 * 1000),
          branch: 'develop',
          message: 'Show the service URL on the overview page',
          author: 'Mark Massoud',
          authorEmail: 'I',
          authorAvatar: 'https://www.gravatar.com/avatar/865c0c0b4ab0e063e5caa3387c1a8741.jpg',
          linkUrl: 'https://git.thecloud.com/projects/CLOUD/repos/dashboard/commits/6021e68cdba52425a3332d01d73ce5e3f1bffc9c',
        },
        {
          id: 17541,
          number: 301,
          event: BuildEvent.tag,
          status: BuildStatus.running,
          createdAt: new Date(1493843912 * 1000),
          finishedAt: new Date(1493844214 * 1000),
          branch: 'develop',
          message: 'Show the service URL on the overview page',
          author: 'Mark Massoud',
          authorAvatar: 'https://www.gravatar.com/avatar/865c0c0b4ab0e063e5caa3387c1a8741.jpg',
          authorEmail: 'I',
          linkUrl: 'https://git.thecloud.com/projects/CLOUD/repos/dashboard/commits/6021e68cdba52425a3332d01d73ce5e3f1bffc9c',
        },
      ];

      const response = responseFactory.toBuilds(BUILDS_RESPONSE);
      expect(response).toEqual(EXPECTED);

      // more tests on the date conversion
      expect(response[0].createdAt.getFullYear()).toBe(2017);
      expect(response[1].createdAt.getFullYear()).toBe(2017);
    });
  });

});
