import { replace } from 'lodash';

// dirty hack to use require
declare const require: any;
const { extractHostname } = require('tldjs');

/* tslint:disable max-line-length */
const grafanaBaseUrl = 'http://sitespeed-metrics.thecloud.io/dashboard/db/page-summary?var-base=sitespeed_io&var-group=%GROUP%&var-page=%PAGE%';

// takes a url, parses its TLD and PATH,
// converts dots to underscores and returns Grafana URL
export function getGrafanaUrl(url: string): string {
  if (!url) {
    return null;
  }

  const urlTld: string = extractHostname(url);
  const urlPathStartIndex = url.lastIndexOf(urlTld);

  const GROUP = dotsToUnderscores(urlTld);

  let PAGE = '_';
  if (urlPathStartIndex > -1) {
    PAGE = dotsToUnderscores(slashesToUnderscores(url.substring(urlPathStartIndex + urlTld.length)) || '_');
  }

  return grafanaBaseUrl
    .replace('%GROUP%', GROUP)
    .replace('%PAGE%', PAGE);
}

// in Grafana url, there is not dots, but underscores
function dotsToUnderscores(url: string): string {
  return replace(url, /\./g, '_');
}

// in Grafana url, there is not slashes, but underscores
function slashesToUnderscores(url: string): string {
  return replace(url, /\//g, '_');
}
