import { FilterByPipe } from './filter-by.pipe';
import { Log } from '../../drone/log/log';
import { LOGS_RESPONSE } from '../../drone/log/logs.data';

describe('FilterByPipe', () => {
  const pipe = new FilterByPipe();
  const LOGS: Log[] = LOGS_RESPONSE;

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('inclusions', () => {
    it('should return null if passed null', () => {
      const filtered = pipe.transform(null, null);
      expect(filtered).toEqual(null);
    });

    it('should return original array if passed null filters', () => {
      const filtered = pipe.transform(LOGS, null);
      expect(filtered).toEqual(LOGS);
    });

    it('should return original array if passed {} filters', () => {
      const filtered = pipe.transform(LOGS, {});
      expect(filtered).toEqual(LOGS);
    });

    it('should return original array if passed null filters properties', () => {
      const filters = {
        proc: null,
        pos: null,
        out: null,
      };

      const filtered = pipe.transform(LOGS, filters);
      expect(filtered).toEqual(LOGS);
    });

    it('should filter properly with falsy filters property 0', () => {
      const filters = {
        pos: 0,
      };

      const filtered = pipe.transform(LOGS, filters);
      expect(filtered).not.toEqual(LOGS);
      expect(filtered.length).toBe(5);
    });

    it('should filter properly with multiple filters properties', () => {
      const filters = {
        proc: 'clone',
        time: 1,
      };

      const filtered = pipe.transform(LOGS, filters);
      expect(filtered).not.toEqual(LOGS);
      expect(filtered.length).toBe(5);
    });

    it('should filter based on a string includes', () => {
      const filters = 'apple';

      const filtered = pipe.transform(['apple', 'apples', 'banana', 'strawberry'], filters);
      expect(filtered).toEqual(['apple', 'apples']);
    });
  });

  describe('exclusions', () => {
    it('should return null if passed null', () => {
      const filtered = pipe.transform(null, null, false);
      expect(filtered).toEqual(null);
    });

    it('should return original array if passed null filters', () => {
      const filtered = pipe.transform(LOGS, null, false);
      expect(filtered).toEqual(LOGS);
    });

    it('should return original array if passed {} filters', () => {
      const filtered = pipe.transform(LOGS, {}, false);
      expect(filtered).toEqual(LOGS);
    });

    it('should return original array if passed null filters properties', () => {
      const filters = {
        proc: null,
        pos: null,
        out: null,
      };

      const filtered = pipe.transform(LOGS, filters, false);
      expect(filtered).toEqual(LOGS);
    });

    it('should filter properly with falsy filters property 0', () => {
      const filters = {
        pos: 0,
      };

      const filtered = pipe.transform(LOGS, filters, false);
      expect(filtered).not.toEqual(LOGS);
      expect(filtered.length).toBe(12);
    });

    it('should filter properly with multiple filters properties', () => {
      const filters = {
        proc: 'clone',
        time: 1,
      };

      const filtered = pipe.transform(LOGS, filters, false);
      expect(filtered).not.toEqual(LOGS);
      expect(filtered.length).toBe(7);
    });

    it('should filter based on a string excludes', () => {
      const filters = 'apple';

      const filtered = pipe.transform(['apple', 'apples', 'banana', 'strawberry'], filters, false);
      expect(filtered).toEqual(['banana', 'strawberry']);
    });

  });
});
