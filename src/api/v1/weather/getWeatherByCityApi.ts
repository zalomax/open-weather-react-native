import ApiService from "../../ApiService";

const getWeatherByCityApi = (params?: any): Promise<any> => {
  const uri = `/weather`

  return ApiService.GET(uri, params)
};

export default getWeatherByCityApi
