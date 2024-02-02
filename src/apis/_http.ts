/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios, { AxiosRequestConfig } from 'axios';

interface HttpResponse<T = unknown> {
  resultCode: number;
  message?: string;
  data: T;
}

class Http {
  readonly axios;

  /** @description 추가 구성 필요 */
  constructor() {
    this.axios = Axios.create({
      baseURL: `${import.meta.env.VITE_BASE_URL as string}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async get<Response = unknown>(url: string, conf: AxiosRequestConfig = {}) {
    return this.axios
      .get<HttpResponse<Response>>(url, {
        ...conf,
      })
      .then((res) => res.data.data);
  }

  async externalGet<Response = unknown>(
    url: string,
    conf: AxiosRequestConfig = {},
  ) {
    return this.axios
      .get<Response>(url, {
        ...conf,
      })
      .then((res) => res.data);
  }

  async post<Request = any, Response = unknown>(
    url: string,
    data?: Request,
    conf: AxiosRequestConfig = {},
  ) {
    return this.axios
      .post<HttpResponse<Response>>(url, data, {
        ...conf,
      })
      .then((res) => res.data.data);
  }

  async externalPost<Request = any, Response = unknown>(
    url: string,
    data?: Request,
    conf: AxiosRequestConfig = {},
  ) {
    return this.axios
      .post<Response>(url, data, {
        ...conf,
      })
      .then((res) => res.data);
  }

  async put<Request = any, Response = unknown>(
    url: string,
    data?: Request,
    conf: AxiosRequestConfig = {},
  ) {
    return this.axios
      .put<HttpResponse<Response>>(url, data, {
        ...conf,
      })
      .then((res) => res.data.data);
  }

  async delete<Request = any, Response = unknown>(
    url: string,
    data?: Request,
    conf: AxiosRequestConfig = {},
  ) {
    return this.axios
      .delete<HttpResponse<Response>>(url, {
        ...conf,
        data,
      })
      .then((res) => res.data.data);
  }
}

// eslint-disable-next-line import/prefer-default-export, no-underscore-dangle
export const _http = new Http();
