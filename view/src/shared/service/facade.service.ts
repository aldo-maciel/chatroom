import axios, { Method } from 'axios';
import toastr from 'toastr';

export class ServiceFacade {
  protected getUrl(url: string): string {
    const base = '/api/v1/';
    if (process.env.NODE_ENV === 'production') {
      return `${base}${url}`;
    }
    return `http://localhost:3000${base}${url}`;
  }

  private async doRequest<T>(
    method: Method = 'GET',
    url: string,
    params?: unknown,
    body?: unknown
  ): Promise<T> {
    try {
      const parameters = {
        url: this.getUrl(url),
        method,
        params,
        data: body,
        headers: {},
      };

      if (body) {
        parameters.data = body;
      }
      if (params) {
        parameters.params = params;
      }
      const { data } = await axios.request<T>(parameters);

      return data;
    } catch (error) {
      toastr.error(
        error.message || 'An operation occurred with error!',
        'Error'
      );
    }
    return Promise.reject<T>();
  }

  /**
   * Make a post request to the server
   *
   */
  doPost<T>(url: string, params?: unknown): Promise<T> {
    return this.doRequest('post', url, undefined, params);
  }

  /**
   * Make a get request to the server
   *
   */
  doGet<T>(url: string, params?: unknown): Promise<T> {
    return this.doRequest('get', url, params);
  }

  /**
   * Make a put request to the server
   *
   */
  doPut<T>(url: string, params?: unknown): Promise<T> {
    return this.doRequest('put', url, undefined, params);
  }

  /**
   * Make a delete request to the server
   *
   */
  doDelete<T>(url: string, params?: unknown): Promise<T> {
    return this.doRequest('delete', url, params);
  }

  /**
   * Make a patch request to the server
   *
   */
  doPatch<T>(url: string, params?: unknown): Promise<T> {
    return this.doRequest('patch', url, params);
  }
}
