import cfg from '../../config/cfg';

export const prepareApiParamsHelper = (payload: any, lang: any) => {
    const apiParams = {
        ...payload,
        APPID: cfg.OPEN_WEATHER_API_KEY
      }
  
      if (lang?.id === 'ru') {
        apiParams.units = 'metric'
        apiParams.lang = 'ru'
      }

    return apiParams
}