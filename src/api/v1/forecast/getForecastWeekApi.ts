import ApiService from '../../ApiService'
import MockApiService from '../../MockApiService'
import json from './__mock__/success_week.json'

const getForecastWeekApi = (params?: any): Promise<any> => {
  const uri = `/forecast`

  // return ApiService.GET(uri, params)
  return MockApiService.GET(json)
};

export default getForecastWeekApi
