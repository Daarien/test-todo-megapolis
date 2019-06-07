import { BaseResponse } from '../store/todo';
export const api_url = 'https://test.megapolis-it.ru/api/list';

export async function take<T = any>(
  url: RequestInfo,
  params?: RequestInit
): Promise<T | ErrorResponse> {
  return await fetch(url, params)
    .then(r => {
      return r.json();
    })
    .catch(error => console.error(error));
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
