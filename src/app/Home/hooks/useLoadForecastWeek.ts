import { useCallback } from 'react'
import { prepareApiParamsHelper } from '../../../api/helpers/prepareApiParamsHelper';
import getForecastWeekApi from '../../../api/v1/forecast/getForecastWeekApi';

const useLoadForecastWeek = (setForecastWeek: any, lang: any) => {

  const loadForecastWeek = useCallback(async (payload: any) => {
    const apiParams = prepareApiParamsHelper(payload, lang)

    try {
      const res = await getForecastWeekApi(apiParams);

      setForecastWeek(res?.json);
    } catch (e) {
      console.warn("ERROR:", e)
    }
  }, [lang]);

  return {
    loadForecastWeek,
  };
};

export default useLoadForecastWeek;
