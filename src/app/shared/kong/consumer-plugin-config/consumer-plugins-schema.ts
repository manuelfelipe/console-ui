import { SchemaFieldType } from '../plugin/schema';

/* tslint:disable max-line-length */
export const ConsumerPluginsSchema = {
  'acls': {
    group: {
      type: SchemaFieldType.string,
      required: true,
      description: 'The arbitrary group name to associate to the consumer.',
    },
  },
  'key-auth': {
    key: {
      type: SchemaFieldType.string,
      description: 'You can optionally set your own unique <code>key</code> to authenticate the client. If missing, the plugin will generate one.',
    },
  },
  'basic-auth': {
    username: {
      type: SchemaFieldType.string,
      required: true,
      description: 'The username to use in the Basic Authentication',
    },
    password: {
      type: SchemaFieldType.string,
      description: 'The password to use in the Basic Authentication',
    },
  },
  'oauth2': {
    name: {
      type: SchemaFieldType.string,
      required: true,
      description: 'The name to associate to the credential. In OAuth 2.0 this would be the application name.',
    },
    client_id: {
      type: SchemaFieldType.string,
      description: 'You can optionally set your own unique <code>client_id</code>. If missing, the plugin will generate one.',
    },
    client_secret: {
      type: SchemaFieldType.string,
      description: 'You can optionally set your own unique <code>client_secret</code>. If missing, the plugin will generate one.',
    },
    redirect_uri: {
      type: SchemaFieldType.array,
      required: true,
      description: 'The URL in your app where users will be sent after authorization (<a href="https://tools.ietf.org/html/rfc6749#section-3.1.2" target="_blank">RFC 6742 Section 3.1.2</a>)',
    },
  },
  'hmac-auth': {
    username: {
      type: SchemaFieldType.string,
      required: true,
      description: 'The username to use in the HMAC Signature verification.',
    },
    secret: {
      type: SchemaFieldType.string,
      description: 'The secret to use in the HMAC Signature verification. Note that if this parameter isn\'t provided, Kong will generate a value for you and send it as part of the response body.',
    },
  },
  'jwt': {
    key: {
      type: SchemaFieldType.string,
      description: 'A unique string identifying the credential. If left out, it will be auto-generated.',
    },
    algorithm: {
      type: SchemaFieldType.string,
      default: 'HS256',
      enum: ['HS256', 'RS256', 'ES256'],
      description: 'The algorithm used to verify the token\'s signature. Can be <code>HS256</code>, <code>RS256</code>, or <code>ES256</code>.',
    },
    rsa_public_key: {
      type: SchemaFieldType.string,
      description: 'If <code>algorithm</code> is <code>RS256</code> or <code>ES256</code>, the public key (in PEM format) to use to verify the token\'s signature.',
    },
    secret: {
      type: SchemaFieldType.string,
      description: 'If <code>algorithm</code> is <code>HS256</code> or <code>ES256</code>, the secret used to sign JWTs for this credential. If left out, will be auto-generated.',
    }
  },
};
