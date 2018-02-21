import { DecodeBase64Pipe } from './decode-base64.pipe';

describe('DecodeBase64Pipe', () => {
  const pipe = new DecodeBase64Pipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return null', () => {
    const decoded = pipe.transform(null);
    expect(decoded).toBeNull();
  });

  it('should return null', () => {
    const decoded = pipe.transform('');
    expect(decoded).toBeNull();
  });

  it('should decode properly', () => {
    const decoded = pipe.transform('eyJhIjoiYiJ9');
    expect(decoded).toBe('{"a":"b"}');
  });
});
