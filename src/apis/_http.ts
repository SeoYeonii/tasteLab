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
      baseURL: `${process.env.BASE_URL as string}`,
      headers: {
        'Content-Type': 'application/json',
        /** @todo authorization 토큰 어떻게 받을 것인지 확인 후 적용 */
        Authorization: '',
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
