export interface SchemaResponse {
  fields: { [key: string]: SchemaFieldResponse };
  no_consumer?: boolean;
  self_check?: string;
  description?: string;
}

export interface SchemaFieldResponse {
  type: string;
  default?: any;
  required?: boolean;
  unique?: boolean;
  immutable?: boolean;
  enum?: string[];
  regex?: string;
  schema?: SchemaResponse;
  func?: string;
  description?: string;
}
