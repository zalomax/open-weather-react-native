import ApiService from '../../ApiService'

const getForecastApi = (params?: any): Promise<any> => {
  const uri = `/forecast`

  return ApiService.GET(uri, params)
};

export default getForecastApi
