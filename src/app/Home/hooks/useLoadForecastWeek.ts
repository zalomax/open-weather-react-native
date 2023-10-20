import { useState, useCallback } from 'react'
import { ForecastData } from '../../../api/v1/forecast/ForecastData.types';
import getForecastWeekApi from '../../../api/v1/forecast/getForecastWeekApi';
import cfg from '../../../config/cfg';

const useLoadForecastWeek = () => {
  const [forecastWeek, setForecastWeek] = useState<ForecastData | null>(null)
  // const [appError, setAppError] = useState<any>(null)  

  const loadForecastWeek = useCallback(async (payload: any) => {
    // setIsLoading(true);

    const apiParams = {
      ...payload,
      APPID: cfg.OPEN_WEATHER_API_KEY
    };

    try {
      const res = await getForecastWeekApi(apiParams);
      // console.log("555 ~ res:", res)

      setForecastWeek(res?.json);
    } catch (e) {
      console.warn("ERROR:", e)
      // setAppError(e);
    }
  }, []);

  return {
    loadForecastWeek,
    forecastWeek,
    // appError
  };
};

export default useLoadForecastWeek;
