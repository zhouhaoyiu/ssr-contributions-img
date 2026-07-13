import axios, { AxiosRequestConfig } from 'axios';
import { Notify } from 'quasar';
import { getApiBaseUrl } from '../utils/runtime-env';

export async function request<T>(cfg: AxiosRequestConfig = {}): Promise<T> {
  try {
    const response = await axios({
      baseURL: getApiBaseUrl(),
      ...cfg,
    });
    return response.data as T;
  } catch (err: unknown) {
    const message = axios.isAxiosError(err) ? err.message : 'Request failed';
    Notify.create({ message, color: 'red' });
    throw err;
  }
}
