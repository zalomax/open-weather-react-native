import AsyncStorage from '@react-native-async-storage/async-storage'
import { format } from 'date-fns'

class CacheService {
  static async getData(keyName: string = 'currentWeather') {
    try {
      const dateText = await AsyncStorage.getItem('dateText');
      const fullData = await AsyncStorage.getItem(keyName);

      return {
        dateText,
        [keyName]: fullData ? JSON.parse(fullData) : null,
      }
    } catch (e) {
      console.warn("ERROR CacheService:", e)
    }

    return null;
  }

  static async setData(keyName: string = 'full-data', fullData: any) {
    try {
      const dateText = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'")

      const jsonValue = JSON.stringify(fullData);
      await AsyncStorage.setItem(keyName, jsonValue);

      await AsyncStorage.setItem('dateText', dateText);
    } catch (e) {
      console.warn("ERROR CacheService:", e)
    }
  }
}

export default CacheService;
