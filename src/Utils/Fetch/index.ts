import fetch, { HeadersInit, HeaderInit } from "node-fetch";

type MethodsType = "POST" | "PUT" | "GET" | "DELETE" | "PATCH";

interface IRequestParams {
  body?: any;
  headers?: HeaderInit;
}

interface IMakeRequestParams extends IRequestParams {
  url: string;
  method: MethodsType;
}

class Fetch {
  private _url: string;
  private _headers: HeadersInit;

  constructor(url?: string, headers?: HeadersInit) {
    this._url = url || "";
    this._headers = headers || {};
  }

  // Getter && Setters

  set setUrl(url: string) {
    this._url = url;
  }

  set setHeaders(headers: HeadersInit) {
    this._headers = headers;
  }

  set addHeaders(headers: HeadersInit) {
    this._headers = {
      ...this._headers,
      ...headers,
    };
  }

  // Public

  async get(url: string, headers?: HeadersInit) {
    return this.makeRequest({
      method: "GET",
      url,
      headers,
    });
  }

  async post(url: string, body?: any, headers?: HeadersInit) {
    return this.makeRequest({
      method: "POST",
      url,
      body,
      headers,
    });
  }

  async put(url: string, body?: any, headers?: HeadersInit) {
    return this.makeRequest({
      method: "PUT",
      url,
      body,
      headers,
    });
  }

  async patch(url: string, body?: any, headers?: HeadersInit) {
    return this.makeRequest({
      method: "PATCH",
      url,
      body,
      headers,
    });
  }

  async delete(url: string, headers?: HeadersInit) {
    return this.makeRequest({
      method: "DELETE",
      url,
      headers,
    });
  }

  // Private

  private async makeRequest({
    method,
    url,
    body,
    headers,
  }: IMakeRequestParams) {
    const response = await fetch(`${this._url}${url}`, {
      method,
      headers: {
        ...this._headers,
        ...(headers || {}),
      },
      body,
    });

    return response;
  }
}

export default Fetch;
