import { useState, useCallback } from 'react'
import { prepareApiParamsHelper } from '../../../api/helpers/prepareApiParamsHelper';
import getForecastApi from '../../../api/v1/forecast/getForecastApi';

const useLoadForecast = (setForecast: any, lang: any) => {
  // const [appError, setAppError] = useState<any>(null)  

  const loadForecast = useCallback(async (payload: any) => {
    const apiParams = prepareApiParamsHelper({ ...payload, cnt: 6 }, lang)    

    try {
      const res = await getForecastApi(apiParams);
      // console.log("555 ~ res:", res)

      setForecast(res?.json);
    } catch (e) {
      console.warn("ERROR:", e)
      // setAppError(e);
    }
  }, [lang]);

  return {
    loadForecast,
    // appError
  };
};

export default useLoadForecast;
