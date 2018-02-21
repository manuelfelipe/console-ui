export interface Log {
  _id: string;
  _index: string;
  _type: string;
  _score: string;
  _source: {
    '@timestamp': string;
    message: any; // could be string, object, array, whatever
  };
}
