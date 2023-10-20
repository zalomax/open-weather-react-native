import { useState, useCallback } from 'react'
import CacheService from '../../../api/CacheService'

const useLoadCachedData = (setters: any) => {
  const [cachedText, setCachedText] = useState<string | null>(null)

  const loadCachedData = useCallback(async () => {
    try {
      const fullData: any = await CacheService.getData()
      console.log("222 ~ data cached:", JSON.stringify(fullData, null, '\t'))

      if (fullData) {
        if (fullData?.currentWeather) {
          setters.setCurrentWeather(fullData?.currentWeather)

          setCachedText(`Cached Weather loaded form ${fullData?.dateText}`)
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
