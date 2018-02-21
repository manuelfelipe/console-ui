import { StartCasePipe } from './start-case.pipe';

describe('StartCasePipe', () => {
  const pipe = new StartCasePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string', () => {
    const startCase = pipe.transform(null);
    expect(startCase).toBe('');
  });

  it('should start case dashes', () => {
    const startCase = pipe.transform('--foo-bar--');
    expect(startCase).toBe('Foo Bar');
  });

  it('should start case from snake case', () => {
    const startCase = pipe.transform('fooBar');
    expect(startCase).toBe('Foo Bar');
  });

  it('should start case underscores', () => {
    const startCase = pipe.transform('__FOO_BAR__');
    expect(startCase).toBe('Foo Bar');
  });

  it('should upper case first char only', () => {
    const startCase = pipe.transform('__cache_ttl__', true);
    expect(startCase).toBe('Cache ttl');
  });
});
