import { RequestMethod } from '@angular/http';

export interface Api {
  id: string;
  name: string;
  hosts?: string[];
  uris?: string[];
  methods?: RequestMethod[];
  upstreamUrl: string;
  createdAt: Date;
}
