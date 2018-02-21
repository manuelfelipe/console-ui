import { PluginResponse } from './plugin-response';

export const KONG_PLUGINS: PluginResponse[] = [
  {
    id: '4d924084-1adb-40a5-c042-63b19db421d1',
    api_id: '5fd1z584-1adb-40a5-c042-63b19db49x21',
    name: 'rate-limiting',
    config: {
      minute: 20,
      hour: 500,
      fake_regex_field: {}
    },
    enabled: true,
    created_at: 1422386534
  },
  {
    id: '3f924084-1adb-40a5-c042-63b19db421a2',
    api_id: '5fd1z584-1adb-40a5-c042-63b19db49x21',
    consumer_id: 'a3dX2dh2-1adb-40a5-c042-63b19dbx83hF4',
    name: 'acl',
    config: {
      whitelist: ['thecloud'],
      blacklist: []
    },
    enabled: true,
    created_at: 1422386585
  }
];
