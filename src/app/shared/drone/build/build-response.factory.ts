import { Build } from './build';
import { BuildStatus } from './build-status';
import { BuildResponse } from './build-response';
import { BuildEvent } from './build-event';

export class BuildResponseFactory {
  toBuild(buildResponse: BuildResponse): Build {
    if (!buildResponse) {
      return null;
    }

    return {
      id: buildResponse.id,
      number: buildResponse.number,
      event: BuildEvent[buildResponse.event],
      status: BuildStatus[buildResponse.status],
      createdAt: this.toDate(buildResponse.created_at),
      finishedAt: this.toDate(buildResponse.finished_at),
      branch: buildResponse.branch,
      message: buildResponse.message,
      author: buildResponse.author,
      authorEmail: buildResponse.author_email,
      authorAvatar: buildResponse.author_avatar,
      linkUrl: buildResponse.link_url,
    };
  };

  toBuilds(builds: BuildResponse[]): Build[] {
    if (!builds) {
      return [];
    }

    return builds.map(build => this.toBuild(build));
  };

  private toDate(d): Date {
    return new Date(d * 1000);
  }
}
