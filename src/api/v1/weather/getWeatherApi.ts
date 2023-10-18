import ApiService from '../../ApiService'
import { WeatherData } from './WeatherData.types';

const getWeatherApi = (params?: any): Promise<any> => {
  const uri = `/weather`

  return ApiService.GET(uri, params)
};

export default getWeatherApi
