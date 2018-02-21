import { ObjectToArrayPipe } from './object-to-array.pipe';

describe('ObjectToArrayPipe', () => {
  const pipe = new ObjectToArrayPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return []', () => {
    const value = pipe.transform(null);
    expect(value).toEqual([]);
  });

  it('should return []', () => {
    const value = pipe.transform([]);
    expect(value).toEqual([]);
  });

  it('should return []', () => {
    const value = pipe.transform({});
    expect(value).toEqual([]);
  });

  it('should return array from object', () => {
    const object = {
      k1: 'v1',
      k2: 'v2',
    };

    const expected = [
      {
        key: 'k1',
        value: 'v1',
      },
      {
        key: 'k2',
        value: 'v2',
      },
    ];

    const value = pipe.transform(object);
    expect(value).toEqual(expected);
  });
});
