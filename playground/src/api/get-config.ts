import type { ConfigItem } from '../types/config';

import { request } from './request';

export function getConfig() {
  return request<ConfigItem[]>({ url: '/config' });
}
