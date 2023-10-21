import { useCallback } from 'react'
import { prepareApiParamsHelper } from '../../../api/helpers/prepareApiParamsHelper';
import getForecastApi from '../../../api/v1/forecast/getForecastApi';

const useLoadForecast = (setForecast: any, lang: any) => {

  const loadForecast = useCallback(async (payload: any) => {
    const apiParams = prepareApiParamsHelper({ ...payload, cnt: 6 }, lang)    

    try {
      const res = await getForecastApi(apiParams);

      setForecast(res?.json);
    } catch (e) {
      console.warn("ERROR:", e)
    }
  }, [lang]);

  return {
    loadForecast,
  };
};

export default useLoadForecast;
