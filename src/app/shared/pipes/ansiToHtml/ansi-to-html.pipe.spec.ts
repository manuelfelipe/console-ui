import { AnsiToHtmlPipe } from './ansi-to-html.pipe';

describe('AnsiToHtmlPipe', () => {
  const pipe: AnsiToHtmlPipe = new AnsiToHtmlPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string', () => {
    const html = pipe.transform(null);
    expect(html).toBe('');
  });

  it('should return processed html', () => {
    const html = pipe.transform('\x1b[30mblack\x1b[37mwhite');
    expect(html).toBe('<span style="color:#000;">black<span style="color:#f0f0f0;">white</span></span>');
  });
});
