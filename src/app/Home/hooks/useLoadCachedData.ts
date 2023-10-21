import { useState, useCallback } from 'react'
import CacheService from '../../../api/CacheService'
import { getDateDiffrenceText } from '../../../lib/helpers/dateHelpers';

const useLoadCachedData = (setters: any) => {
  const [cachedText, setCachedText] = useState<string | null>(null)

  const loadCachedData = useCallback(async () => {
    try {
      const fullData: any = await CacheService.getData()
      // console.log("222 ~ data cached:", JSON.stringify(fullData, null, '\t'))

      if (fullData) {
        if (fullData?.currentWeather) {
          setters.setCurrentWeather(fullData?.currentWeather)

          const diffrenceText = getDateDiffrenceText(new Date(), new Date(fullData?.dateText))
          setCachedText(`Weather data loaded > ${diffrenceText} ago`)

          return
        }
        // if (fullData['forecast']) {
        //   setters.setForecast(fullData['forecast'])
        // }
        // if (fullData['forecastWeek']) {
        //   setters.setForecastWeek(fullData['forecastWeek'])
        // }        
      }

      setCachedText(`Cached Weather not present yet`)
    } catch (e) {
      console.warn("ERROR:", e)
    }
  }, []);

  return {
    loadCachedData,
    cachedText,
    setCachedText
  };
};

export default useLoadCachedData;
