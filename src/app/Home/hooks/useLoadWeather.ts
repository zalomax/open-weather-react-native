import { useState, useCallback } from 'react'
import CacheService from '../../../api/CacheService';
import getWeatherApi from '../../../api/v1/weather/getWeatherApi';
import cfg from '../../../config/cfg';

const useLoadWeather = (setCurrentWeather: any) => {
  const [appError, setAppError] = useState<any>(null)

  const loadWeather = useCallback(async (payload: any) => {
    // setIsLoading(true);

    const apiParams = {
      ...payload,
      APPID: cfg.OPEN_WEATHER_API_KEY
    };

    try {
      const res = await getWeatherApi(apiParams);
      // console.log("555 ~ res:", res)

      await CacheService.setData('currentWeather', res?.json)
      // await CacheService.setData('currentWeather', null)

      setCurrentWeather(res?.json);
    } catch (e) {
      console.warn("ERROR:", e)
      setAppError(e);
    }
  }, []);

  return {
    loadWeather,    
    appError
  };
};

export default useLoadWeather;
