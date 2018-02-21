import { CronToTextPipe } from './cron-to-text.pipe';

describe('CronToTextPipe', () => {
  const pipe = new CronToTextPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('return `` if invalid cron, null', () => {
    const text = pipe.transform(null);
    expect(text).toBe('');
  });

  it('return `` if invalid cron, soajs', () => {
    const text = pipe.transform('soajs');
    expect(text).toBe('');
  });

  it('return correct text if valid cron, * * * * *', () => {
    const text = pipe.transform('* * * * *');
    expect(text).toBe('Every minute');
  });

  it('return correct text if valid cron, * * * * * *', () => {
    const text = pipe.transform('* * * * * *');
    expect(text).toBe('Every second');
  });

  it('return correct text if valid cron, 0 0 * * *', () => {
    const text = pipe.transform('0 0 * * *');
    expect(text).toBe('At 12:00 AM');
  });
});
