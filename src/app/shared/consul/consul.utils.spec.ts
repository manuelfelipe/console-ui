import {
  getFileType,
  isEnvironmentKey,
  isFolder,
  isProjectKey,
  isRepositoryKey,
  isRootKey,
  isSecretKey,
  trimSlashes
} from './consul.utils';
import { FileType } from './file-type';

describe('ConsulUtils Tests', () => {

  describe('isFolder', () => {
    it('should return false if passed null', () => {
      const is = isFolder(null);
      expect(is).toBe(false);
    });

    it('should return false if passed empty string', () => {
      const is = isFolder('');
      expect(is).toBe(false);
    });

    it('should return false if not ending with slash /', () => {
      const is = isFolder('CLOUD/console-server');
      expect(is).toBe(false);
    });

    it('should return true if ending with slash /', () => {
      const is = isFolder('CLOUD/console-server/');
      expect(is).toBe(true);
    });
  });

  describe('isRootKey', () => {
    it('should return true if passed null', () => {
      const is = isRootKey(null);
      expect(is).toBe(true);
    });

    it('should return true if passed empty string', () => {
      const is = isRootKey('');
      expect(is).toBe(true);
    });

    it('should return true if just a slash /', () => {
      const is = isRootKey('/');
      expect(is).toBe(true);
    });

    it('should return false if more than one slash /', () => {
      const is = isRootKey('//');
      expect(is).toBe(false);
    });

    it('should return false if more than one slash /, with key, with slash at beginning', () => {
      const is = isRootKey('/CLOUD/');
      expect(is).toBe(false);
    });

    it('should return false if more than one slash /, with key, no slash at beginning', () => {
      const is = isRootKey('CLOUD/console-ui/');
      expect(is).toBe(false);
    });

    it('should return false if one slash / only, with key, no slash at beginning', () => {
      const is = isRootKey('CLOUD/console-ui');
      expect(is).toBe(false);
    });
  });

  describe('isProjectKey', () => {
    it('should return false if passed null', () => {
      const is = isProjectKey(null);
      expect(is).toBe(false);
    });

    it('should return false if passed empty string', () => {
      const is = isProjectKey('');
      expect(is).toBe(false);
    });

    it('should return false if passed just a slash /', () => {
      const is = isProjectKey('/');
      expect(is).toBe(false);
    });

    it('should return false if more than a folder, no slash in beginning', () => {
      const is = isProjectKey('CLOUD/console-server/');
      expect(is).toBe(false);
    });

    it('should return false if more than a folder, slash in beginning', () => {
      const is = isProjectKey('/CLOUD/console-server/');
      expect(is).toBe(false);
    });

    it('should return true if ending with slash /, no slash in beginning', () => {
      const is = isProjectKey('CLOUD/');
      expect(is).toBe(true);
    });

    it('should return true if ending with slash /, slash in beginning', () => {
      const is = isProjectKey('/CLOUD/');
      expect(is).toBe(true);
    });
  });

  describe('isRepositoryKey', () => {
    it('should return false if passed null', () => {
      const is = isRepositoryKey(null);
      expect(is).toBe(false);
    });

    it('should return false if passed empty string', () => {
      const is = isRepositoryKey('');
      expect(is).toBe(false);
    });

    it('should return false if passed just a slash /', () => {
      const is = isRepositoryKey('/');
      expect(is).toBe(false);
    });

    it('should return false if passed just one folder, with slashes', () => {
      const is = isRepositoryKey('/CLOUD/');
      expect(is).toBe(false);
    });

    it('should return false if passed just one folder, no slashes', () => {
      const is = isRepositoryKey('CLOUD');
      expect(is).toBe(false);
    });

    it('should return false if passed just one folder, slash at beginning', () => {
      const is = isRepositoryKey('/CLOUD');
      expect(is).toBe(false);
    });

    it('should return false if passed just one folder, slash at end', () => {
      const is = isRepositoryKey('CLOUD/');
      expect(is).toBe(false);
    });

    it('should return false if two folders, no slash at end', () => {
      const is = isRepositoryKey('CLOUD/console-server');
      expect(is).toBe(false);
    });

    it('should return false if more than two folders', () => {
      const is = isRepositoryKey('CLOUD/console-server/dev');
      expect(is).toBe(false);
    });

    it('should return true if two folders, with slashes', () => {
      const is = isRepositoryKey('/CLOUD/console-server/');
      expect(is).toBe(true);
    });

    it('should return true if two folders, no slash at beginning', () => {
      const is = isRepositoryKey('CLOUD/console-server/');
      expect(is).toBe(true);
    });
  });

  describe('isEnvironmentKey', () => {
    it('should return false if passed null', () => {
      const is = isEnvironmentKey(null);
      expect(is).toBe(false);
    });

    it('should return false if passed empty string', () => {
      const is = isEnvironmentKey('');
      expect(is).toBe(false);
    });

    it('should return false if passed just a slash /', () => {
      const is = isEnvironmentKey('/');
      expect(is).toBe(false);
    });

    it('should return false if passed just one folder, with slashes', () => {
      const is = isEnvironmentKey('/CLOUD/');
      expect(is).toBe(false);
    });

    it('should return false if passed just one folder, no slashes', () => {
      const is = isEnvironmentKey('CLOUD');
      expect(is).toBe(false);
    });

    it('should return false if passed just one folder, slash at beginning', () => {
      const is = isEnvironmentKey('/CLOUD');
      expect(is).toBe(false);
    });

    it('should return false if passed just one folder, slash at end', () => {
      const is = isEnvironmentKey('CLOUD/');
      expect(is).toBe(false);
    });

    it('should return false if two folders, no slashes', () => {
      const is = isEnvironmentKey('CLOUD/console-server');
      expect(is).toBe(false);
    });

    it('should return false if two folders, no slash at end', () => {
      const is = isEnvironmentKey('CLOUD/console-server');
      expect(is).toBe(false);
    });

    it('should return false if more than three folders', () => {
      const is = isEnvironmentKey('CLOUD/console-server/dev');
      expect(is).toBe(false);
    });

    it('should return false if two folders, no slash at end', () => {
      const is = isEnvironmentKey('CLOUD/console-server/dev');
      expect(is).toBe(false);
    });

    it('should return true if two folders, with slashes', () => {
      const is = isEnvironmentKey('/CLOUD/console-server/dev/');
      expect(is).toBe(true);
    });

    it('should return true if two folders, no slash at beginning', () => {
      const is = isEnvironmentKey('CLOUD/console-server/prod/');
      expect(is).toBe(true);
    });
  });

  describe('trimSlashes', () => {
    it('should return empty string if passed null', () => {
      const key = trimSlashes(null);
      expect(key).toBe('');
    });

    it('should return empty string if passed empty string', () => {
      const key = trimSlashes('');
      expect(key).toBe('');
    });

    it('should return key as is if no slashes', () => {
      const key = trimSlashes('KeyWithoutSlashes');
      expect(key).toBe('KeyWithoutSlashes');
    });

    it('should return key without slashes', () => {
      const key = trimSlashes('/Key/With//Slashes/');
      expect(key).toBe('KeyWithSlashes');
    });
  });

  describe('isSecretKey()', function () {
    const isSecretKeyUtil = isSecretKey;

    it('should return false if no key', function (done) {
      const isSecretKey = isSecretKeyUtil(null);

      expect(isSecretKey).toBe(false);
      done();
    });

    it('should return false if key is empty string', function (done) {
      const isSecretKey = isSecretKeyUtil('');

      expect(isSecretKey).toBe(false);
      done();
    });

    it('should return false if key contains dots in the middle', function (done) {
      const isSecretKey = isSecretKeyUtil('key./key.key/');

      expect(isSecretKey).toBe(false);
      done();
    });

    it('should return true if key is a dot', function (done) {
      const isSecretKey = isSecretKeyUtil('.');

      expect(isSecretKey).toBe(true);
      done();
    });

    it('should return true if key contains dot at beginning', function (done) {
      const isSecretKey = isSecretKeyUtil('.key/key/');

      expect(isSecretKey).toBe(true);
      done();
    });

    it('should return true if key contains dot after any slash', function (done) {
      const isSecretKey = isSecretKeyUtil('key/.key/');

      expect(isSecretKey).toBe(true);
      done();
    });

    it('should return true if key contains dot after any slash and in the middle', function (done) {
      const isSecretKey = isSecretKeyUtil('key/.key.key./');

      expect(isSecretKey).toBe(true);
      done();
    });
  });

  describe('getFileType()', function () {
    const getFileTypeUtil = getFileType;

    it('should return `text` if no key', function () {
      const type = getFileType(null);
      expect(type).toBe(FileType.text);
    });

    it('should return `text` if key is empty string', function () {
      const type = getFileType('');
      expect(type).toBe(FileType.text);
    });

    it('should return `text` if key is whatever', function () {
      const type = getFileType('folder/file');
      expect(type).toBe(FileType.text);
    });

    it('should return `javascript` if key is .JSON', function () {
      const type = getFileType('folder/file.JSON');
      expect(type).toBe(FileType.json);
    });

    it('should return `javascript` if key is .json', function () {
      const type = getFileType('folder/file.json');
      expect(type).toBe(FileType.json);
    });

    it('should return `yaml` if key is .YAML', function () {
      const type = getFileType('folder/file.YAML');
      expect(type).toBe(FileType.yaml);
    });

    it('should return `yaml` if key is .yml', function () {
      const type = getFileType('folder/file.yml');
      expect(type).toBe(FileType.yaml);
    });

    it('should return `yaml` if key is .yaml', function () {
      const type = getFileType('folder/file.yaml');
      expect(type).toBe(FileType.yaml);
    });
  });
});
