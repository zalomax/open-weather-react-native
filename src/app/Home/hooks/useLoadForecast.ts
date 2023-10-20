import { useState, useCallback } from 'react'
import getForecastApi from '../../../api/v1/forecast/getForecastApi';
import cfg from '../../../config/cfg';

const useLoadForecast = (setForecast: any) => {  
  // const [appError, setAppError] = useState<any>(null)  

  const loadForecast = useCallback(async (payload: any) => {
    // setIsLoading(true);

    const apiParams = {
      ...payload,
      cnt: 6,
      APPID: cfg.OPEN_WEATHER_API_KEY
    };

    try {
      const res = await getForecastApi(apiParams);
      // console.log("555 ~ res:", res)

      setForecast(res?.json);
    } catch (e) {
      console.warn("ERROR:", e)
      // setAppError(e);
    }
  }, []);

  return {
    loadForecast,    
    // appError
  };
};

export default useLoadForecast;
