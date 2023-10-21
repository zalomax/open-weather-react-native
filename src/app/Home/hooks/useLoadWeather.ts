import { useState, useCallback } from 'react'
import CacheService from '../../../api/CacheService';
import { prepareApiParamsHelper } from '../../../api/helpers/prepareApiParamsHelper';
import getWeatherApi from '../../../api/v1/weather/getWeatherApi';

const useLoadWeather = (setCurrentWeather: any, lang: any) => {
  const [appError, setAppError] = useState<any>(null)

  const loadWeather = useCallback(async (payload: any) => {    
    const apiParams = prepareApiParamsHelper(payload, lang)

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
  }, [lang]);

  return {
    loadWeather,
    appError
  };
};

export default useLoadWeather;
