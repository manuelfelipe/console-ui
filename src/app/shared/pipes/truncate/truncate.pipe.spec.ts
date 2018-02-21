import { TruncatePipe } from './truncate.pipe';

describe('Truncate Pipe', () => {
  const truncatePipe = new TruncatePipe();

  const loremTwenty = 'Lorem ipsum dolor si';
  const loremWord = 'Lorem';

  it('should be instantiable', () => {
    expect(truncatePipe).not.toBeNull();
  });

  it('should return empty string if phrase is null', () => {
    expect(truncatePipe.transform('')).toEqual('');
    expect(truncatePipe.transform(null)).toEqual('');
    expect(truncatePipe.transform(undefined)).toEqual('');
  });

  it('should return original phrase if limit was not provided or equals zero', () => {
    expect(truncatePipe.transform(loremTwenty)).toEqual(loremTwenty);
    expect(truncatePipe.transform(loremTwenty, 0)).toEqual(loremTwenty);
  });

  it('should return original phrase if limit equals string length', () => {
    let length = loremTwenty.length;
    expect(truncatePipe.transform(loremTwenty, length)).toEqual(loremTwenty);
  });

  it('should return truncated word', () => {
    expect(truncatePipe.transform(loremWord, 4)).toEqual('Lore...');
  });

  it('should return truncated word without ellipsis', () => {
    expect(truncatePipe.transform(loremWord, 4, false)).toEqual('Lore');
  });

  it('should return truncated sentence with removed last word', () => {
    expect(truncatePipe.transform(loremTwenty, 19)).toEqual('Lorem ipsum dolor...');
  });
});
