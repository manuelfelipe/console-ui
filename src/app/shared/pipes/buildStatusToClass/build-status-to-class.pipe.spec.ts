import { BuildStatusToClassPipe } from './build-status-to-class.pipe';

describe('BuildStatusToClassPipe', () => {
  const pipe = new BuildStatusToClassPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return `success`', () => {
    const status = pipe.transform('success');
    expect(status).toBe('success');
  });

  it('should return `danger`', () => {
    const status = pipe.transform('failure');
    expect(status).toBe('danger');
  });

  it('should return `danger`', () => {
    const status = pipe.transform('killed');
    expect(status).toBe('danger');
  });

  it('should return `warning`', () => {
    const status = pipe.transform('pending');
    expect(status).toBe('warning');
  });

  it('should return `warning`', () => {
    const status = pipe.transform('running');
    expect(status).toBe('warning');
  });

  it('should return `unknown`', () => {
    const status = pipe.transform(null);
    expect(status).toBe('unknown');
  });

  it('should return `unknown`', () => {
    const status = pipe.transform('unknown status');
    expect(status).toBe('unknown');
  });
});
