const getData = (json: any, options: any = {}) => {
  const { timeout = 1000, response = { ok: true, status: 200 } } = options;

  return new Promise((resolve) => {
    setTimeout(() => resolve({ response, json }), timeout);
  });
};

class MockApiService {
  static async GET(json: any, options?: any) {
    return getData(json, options);
  }

  static async POST(json: any, options?: any) {
    const res = await MockApiService.makeRequest(json, options);

    return res;
  }

  static async PATCH(json: any, options?: any) {
    const res = await MockApiService.makeRequest(json, options);

    return res;
  }

  static async makeRequest(json: any, options: any, ...rest: any) {
    return getData(json, options);
  }
}

export default MockApiService;
