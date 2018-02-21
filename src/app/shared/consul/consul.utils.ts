import { get } from 'lodash';
import { FileType } from './file-type';

// true if it ends with a slash
export const isFolder = (key: string): boolean => {
  return !!key && key.substr(-1) === '/';
};

export const isRootKey = (key: string): boolean => {
  return !key || (key.length === 1 && key.startsWith('/'));
};

export const isProjectKey = (key: string): boolean => {
  return !!key && (/^\/?[^\/]+\/?$/).test(key);
};

export const isRepositoryKey = (key: string): boolean => {
  return !!key && (/^\/?[^\/]+\/[^\/]+\/$/).test(key);
};

export const isEnvironmentKey = (key: string): boolean => {
  return !!key && (/^\/?[^\/]+\/[^\/]+\/[^\/]+\/$/).test(key);
};

export const trimSlashes = (key: string): string => {
  return key ? key.replace(/\//g, '') : '';
};

/**
 * Returns true if key contains a dot at beginning of a path
 * e.g. .key1/key2/key3  => true
 *      key1/.key2/key3/ => true
 *      key1/.key2/.key3 => true
 *      key1/key2/key3 => false
 */
export const isSecretKey = (key: string): boolean => {
  return !!key && (key.startsWith('.') || (/\/\./).test(key));
};

export const getFileType = (key: string): FileType => {
  const fileExtension = key ? get<string>(key.match(/\.[^\/\.]+$/), '[0]', '') : '';

  switch (fileExtension.toLowerCase()) {
    case '.json':
      return FileType.json;
    case '.yml':
    case '.yaml':
      return FileType.yaml;
    default:
      return FileType.text;
  }
};
