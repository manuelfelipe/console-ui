import { NaPipe } from './na.pipe';

describe('N/A Pipe', () => {
  const naPipe = new NaPipe();

  it('should be instantiable', () => {
    expect(naPipe).toBeDefined();
  });

  it('explicitly passing 0 (zero) should return 0', () => {
    expect(naPipe.transform(0, 'N/A')).toEqual(0);
    expect(naPipe.transform('0', 'N/A')).toEqual('0');
  });

  it('should return N/A string when input is null', () => {
    expect(naPipe.transform('', 'N/A')).toEqual('N/A');
    expect(naPipe.transform(null, 'N/A')).toEqual('N/A');
    expect(naPipe.transform(undefined, 'N/A')).toEqual('N/A');
  });

  it('should return n/d string when input is null', () => {
    expect(naPipe.transform(null, 'n/d')).toEqual('n/d');
  });

  it('should return value when input is provided', () => {
    expect(naPipe.transform('Allo', 'n/d')).toEqual('Allo');
  });

});
