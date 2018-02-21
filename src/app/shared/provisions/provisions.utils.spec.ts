import { getEnumeratorKeys } from './provisions.utils';
import { ProvisionAppLanguage } from '../../application/self-service/provisions/provision-app/provision-app-language';

describe('ProvisionsUtils', () => {
  it('should return empty array if passed null', () => {
    const keys = getEnumeratorKeys(null);
    expect(keys).toEqual([]);
  });

  it('should return string keys only', () => {
    const keys = getEnumeratorKeys(ProvisionAppLanguage);
    expect(keys).toEqual(['NodeJS', 'Python', 'Java', 'PHP']);
  });
});
