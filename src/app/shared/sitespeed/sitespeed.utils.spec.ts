import { getGrafanaUrl } from './sitespeed.utils';

/* tslint:disable max-line-length */
describe('SiteSpeedUtils Tests', () => {
  describe('getGrafanaUrl', () => {
    it('should return null if passed null', () => {
      const url = getGrafanaUrl(null);
      expect(url).toBeNull();
    });

    it('should return null if passed empty string', () => {
      const url = getGrafanaUrl('');
      expect(url).toBeNull();
    });

    it('should return correct url, tld.io only', () => {
      const url = getGrafanaUrl('console.thecloud.io');
      expect(url).toBe('http://sitespeed-metrics.thecloud.io/dashboard/db/page-summary?var-base=sitespeed_io&var-group=console_thecloud_io&var-page=_');
    });

    it('should return correct url, http://tld.io', () => {
      const url = getGrafanaUrl('https://console.thecloud.io');
      expect(url).toBe('http://sitespeed-metrics.thecloud.io/dashboard/db/page-summary?var-base=sitespeed_io&var-group=console_thecloud_io&var-page=_');
    });

    it('should return correct url, http://www.tld.io', () => {
      const url = getGrafanaUrl('https://www.console.thecloud.io');
      expect(url).toBe('http://sitespeed-metrics.thecloud.io/dashboard/db/page-summary?var-base=sitespeed_io&var-group=www_console_thecloud_io&var-page=_');
    });

    it('should return correct url, http://www.tld.io/', () => {
      const url = getGrafanaUrl('https://www.console.thecloud.io/');
      expect(url).toBe('http://sitespeed-metrics.thecloud.io/dashboard/db/page-summary?var-base=sitespeed_io&var-group=www_console_thecloud_io&var-page=_');
    });

    it('should return correct url, https://www.yellowpages.ca/bus/Canada/State-Farm/7718756.html', () => {
      const url = getGrafanaUrl('https://www.yellowpages.ca/bus/Canada/State-Farm/7718756.html');
      expect(url).toBe('http://sitespeed-metrics.thecloud.io/dashboard/db/page-summary?var-base=sitespeed_io&var-group=www_yellowpages_ca&var-page=_bus_Canada_State-Farm_7718756_html');
    });
  });
});
