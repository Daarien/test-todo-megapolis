import { BaseResponse } from '../store/todo';
export const api_url = 'https://test.megapolis-it.ru/api/list';

type ReqSettings = {
  baseURL: string;
  credentials?: RequestCredentials;
  headers?: Record<string, string>;
  timeout?: number;
}

class Req {
  private baseURL: string;
  private credentials?: RequestCredentials;

  constructor({ baseURL, credentials }: ReqSettings) {
    this.baseURL = baseURL;
    this.credentials = credentials;
  }

  public async get<T>(path: string): Promise<T> {
    const uri = this.baseURL + path;
    return await fetch(uri).then(r => r.json())
  }

  public async post<T>(path: string, payload?: any): Promise<T> {
    const uri = this.baseURL + path;
    return await fetch(uri, { method: 'POST', credentials: this.credentials, body: JSON.stringify(payload) }).then(r => r.json())
  }
}

export const request = new Req({ baseURL: api_url })

export async function take<T = any>(
  url: RequestInfo,
  params: RequestInit = {} as RequestInit
): Promise<T | ErrorResponse> {
  return await fetch(url, {
    mode: 'no-cors', ...params
  })
    .then(r => {
      if (r.ok)
        return r.json();
      throw new Error('Request failed')
    })
    .catch(error => {
      console.error('API ~ take ~ error', error)
      const errorResponse: ErrorResponse = {
        success: false,
        error
      }
      return errorResponse;
    });
}

type ReqMethod = 'POST' | 'DELETE';
type ReqObj = {
  title: string;
};
export function getParams(method: ReqMethod, obj: ReqObj): RequestInit {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  };
}
type ErrorResponse = {
  success: boolean;
  error: string;
};

export function isOk<T extends BaseResponse>(arg: T | ErrorResponse): arg is T {
  return arg.success;
}
