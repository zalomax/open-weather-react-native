import { useState, useCallback } from 'react'
import getWeatherByCityApi from '../../../api/v1/weather/getWeatherByCityApi';
import cfg from '../../../config/cfg';

const useLoadWeather = () => {
  const [currentWeather, setCurrentWeather] = useState<any>(null)
  const [appError, setAppError] = useState<any>(null)  

  const loadWeather = useCallback(async () => {
    // setIsLoading(true);

    const apiParams = {
      q: 'London,uk',
      APPID: cfg.OPEN_WEATHER_API_KEY
    };

    try {
      const res = await getWeatherByCityApi(apiParams);
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
