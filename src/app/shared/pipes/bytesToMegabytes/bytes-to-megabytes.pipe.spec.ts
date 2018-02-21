import { BytesToMegabytesPipe } from './bytes-to-megabytes.pipe';

describe('BytesToMegabytesPipe', () => {
  const pipe = new BytesToMegabytesPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return 0', () => {
    const megabytes = pipe.transform(null);
    expect(megabytes).toBe(0);
  });

  it('should return 355', () => {
    const megabytes = pipe.transform(355179264);
    expect(megabytes).toBe(355);
  });

  it('should return 356', () => {
    const megabytes = pipe.transform(355979264);
    expect(megabytes).toBe(356);
  });
});
