export interface Schema {
  fields: { [key: string]: SchemaField };
  noConsumer?: boolean;
  description?: string;
}

export interface SchemaField {
  type: SchemaFieldType;
  default?: any;
  required?: boolean;
  unique?: boolean;
  immutable?: boolean;
  enum?: string[];
  regex?: RegExp;
  description?: string;
}

export enum SchemaFieldType {
  id,
  number,
  boolean,
  string,
  table,
  array,
  url,
  timestamp,
}
