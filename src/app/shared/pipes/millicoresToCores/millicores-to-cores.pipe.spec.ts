import { MilliCoresToCoresPipe } from './millicores-to-cores.pipe';

describe('MillicoresToCoresPipe', () => {
  const pipe = new MilliCoresToCoresPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return 0', () => {
    const cores = pipe.transform(null);
    expect(cores).toBe(0);
  });

  it('should return 1.233', () => {
    const cores = pipe.transform(1233);
    expect(cores).toBe(1.233);
  });
});
