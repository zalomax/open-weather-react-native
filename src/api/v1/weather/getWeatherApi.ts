import ApiService from '../../ApiService'

const getWeatherApi = (params?: any): Promise<any> => {
  const uri = `/weather`

  return ApiService.GET(uri, params)
};

export default getWeatherApi
