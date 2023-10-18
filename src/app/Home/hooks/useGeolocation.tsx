import { useState, useEffect } from 'react'
import * as Location from 'expo-location'
import { MyGeolocation } from './types/MyGeolocation.types';

/*
 San Francisco 37.4220936, -122.083922
 
{
  "timestamp": 1697648222221,
  "mocked": false,
  "coords": {
          "altitude": 0,
          "heading": 0,
          "latitude": 37.4220936,
          "longitude": -122.083922,
          "altitudeAccuracy": 0,
          "speed": 0,
          "accuracy": 600
  }
}
*/

const useGeolocation = () => {
  const [location, setLocation] = useState<MyGeolocation | null>(null)
  const [errorMsg, setErrorMsg] = useState<any>(null)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return;
      }

      let location: any = await Location.getCurrentPositionAsync({})
      setLocation(location)
    })();
  }, []);

  return {
    location,
  };
};

export default useGeolocation
