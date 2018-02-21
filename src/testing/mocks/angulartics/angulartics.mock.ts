import { Angulartics2 } from 'angulartics2';

export class AngularticsMock {
  developerMode: Function = (value: boolean): void => {
    throw new Error('AngularticsMock.developerMode unimplemented');
  };
}

export const ANGULARTICS_MOCK_PROVIDER = {
  provide: Angulartics2,
  useClass: AngularticsMock,
};
