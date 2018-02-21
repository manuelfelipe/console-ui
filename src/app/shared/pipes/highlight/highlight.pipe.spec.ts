import { HighlightPipe } from './highlight.pipe';

describe('HighlightPipe', () => {
  const pipe = new HighlightPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return null if passed null text', () => {
    const highlight = pipe.transform(null, 'highlight');
    expect(highlight).toBeNull();
  });

  it('should return text if passed null search', () => {
    const highlight = pipe.transform('text', null);
    expect(highlight).toBe('text');
  });

  it('should return text if no matches found', () => {
    const highlight = pipe.transform('text', 'lol');
    expect(highlight).toBe('text');
  });

  it('should return highlighted text wrapped in `highlight` span class', () => {
    const highlight = pipe.transform('CLOUD/console-server', 'OUD/con');
    expect(highlight).toBe('CL<span class="highlight">OUD/con</span>sole-server');
  });

  it('should return highlighted text wrapped in `highlight` span class, and preserve case sensitivity', () => {
    const highlight = pipe.transform('CLOUD/console-server', 'oud/CON');
    expect(highlight).toBe('CL<span class="highlight">OUD/con</span>sole-server');
  });

  it('should return all highlighted text', () => {
    const highlight = pipe.transform('CLOUD/console-server', 'oud/ ver');
    expect(highlight).toBe('CL<span class="highlight">OUD/</span>console-ser<span class="highlight">ver</span>');
  });
});
