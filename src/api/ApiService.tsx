import urlApiHelper from './urlApiHelper';

class ApiService {
  static async GET<T>(uri: string, params?: any): Promise<any> {
    const url = urlApiHelper(uri, params);

    const options: any = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, options);

    if (!response.headers.get('content-type')?.includes('application/json')) {
      throw new Error('Not JSON response');
    }

    const json = await response.json();

    return { response, json };
  }
}

export default ApiService;
