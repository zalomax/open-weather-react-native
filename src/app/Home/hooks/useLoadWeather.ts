import { useState, useCallback } from 'react'
import getWeatherApi from '../../../api/v1/weather/getWeatherApi';
import { WeatherData } from '../../../api/v1/weather/WeatherData.types';
import cfg from '../../../config/cfg';

const useLoadWeather = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null)
  const [appError, setAppError] = useState<any>(null)  

  const loadWeather = useCallback(async (payload: any) => {
    // setIsLoading(true);

    const apiParams = {
      ...payload,
      // q: 'London,uk',
      APPID: cfg.OPEN_WEATHER_API_KEY
    };

    try {
      const res = await getWeatherApi(apiParams);
      // console.log("555 ~ res:", res)

      setCurrentWeather(res?.json);
    } catch (e) {
      console.warn("ERROR:", e)
      setAppError(e);
    }
  }, []);

  return {
    loadWeather,
    currentWeather,
    appError
  };
};

export default useLoadWeather;
