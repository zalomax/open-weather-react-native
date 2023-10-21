import { useState, useCallback } from 'react'
import { prepareApiParamsHelper } from '../../../api/helpers/prepareApiParamsHelper';
import getForecastWeekApi from '../../../api/v1/forecast/getForecastWeekApi';

const useLoadForecastWeek = (setForecastWeek: any, lang: any) => {
  // const [appError, setAppError] = useState<any>(null)  

  const loadForecastWeek = useCallback(async (payload: any) => {
    const apiParams = prepareApiParamsHelper(payload, lang)

    try {
      const res = await getForecastWeekApi(apiParams);
      // console.log("555 ~ res:", res)

      setForecastWeek(res?.json);
    } catch (e) {
      console.warn("ERROR:", e)
      // setAppError(e);
    }
  }, [lang]);

  return {
    loadForecastWeek,
    // appError
  };
};

export default useLoadForecastWeek;
