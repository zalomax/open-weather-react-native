import ApiService from '../../ApiService'
// import MockApiService from '../../MockApiService';
// import json from './__mock__/success.json';

const getWeatherApi = (params?: any): Promise<any> => {
  const uri = `/weather`

  return ApiService.GET(uri, params)
  // return MockApiService.GET(json);
};

export default getWeatherApi
