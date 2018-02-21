import { Angulartics2GoogleAnalytics } from 'angulartics2';

export class AngularticsGoogleAnalyticsMock {
  setUsername: Function = (userId: string): void => {
    throw new Error('AngularticsGoogleAnalyticsMock.setUsername unimplemented');
  }
}

export const ANGULARTICS_GOOGLE_ANALYTICS_MOCK_PROVIDER = {
  provide: Angulartics2GoogleAnalytics,
  useClass: AngularticsGoogleAnalyticsMock,
};
