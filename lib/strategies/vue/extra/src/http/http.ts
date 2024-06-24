import axios, { AxiosRequestConfig } from 'axios';
import { addToken } from './interceptors/add-token';
import { catchLoginExpired } from './interceptors/catch-login-expired';
import { queryArrayToString } from './interceptors/query-array-to-string';

export interface Pagination {
  length: number;
  offset: number;
  total: number;
}
export interface HttpResponse<T = unknown> {
  comments: string;
  statusCode: number;
  data?: T;
  pagination?: Pagination;
}

axios.interceptors.request.use(queryArrayToString);
axios.interceptors.request.use(addToken);
axios.interceptors.response.use(catchLoginExpired);

class Http {
  // request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
  // get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  // delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  // head<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  // options<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  // post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  // put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  // patch<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  // postForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  // putForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  // patchForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  async request<T = unknown, R = HttpResponse<T>, D = unknown>(
    config: AxiosRequestConfig<D>,
  ): Promise<R> {
    const res = await axios.request(config);
    return res.data;
  }

  get<T = unknown, R = HttpResponse<T>, D = unknown>(
    url: string,
    params = {},
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.request({
      method: 'GET',
      url,
      params,
      ...config,
    });
  }

  delete<T = unknown, R = HttpResponse<T>, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.request({
      method: 'DELETE',
      url,
      ...config,
    });
  }

  options<T = unknown, R = HttpResponse<T>, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.request({
      method: 'OPTIONS',
      url,
      ...config,
    });
  }

  head<T = unknown, R = HttpResponse<T>, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.request({
      method: 'HEAD',
      url,
      ...config,
    });
  }

  post<T = unknown, R = HttpResponse<T>, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.request({
      method: 'POST',
      url,
      data,
      ...config,
    });
  }

  put<T = unknown, R = HttpResponse<T>, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.request({
      method: 'PUT',
      url,
      data,
      ...config,
    });
  }

  patch<T = unknown, R = HttpResponse<T>, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.request({
      method: 'PATCH',
      url,
      data,
      ...config,
    });
  }
}

export default new Http();
