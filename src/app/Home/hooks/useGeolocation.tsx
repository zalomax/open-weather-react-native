import { useState, useEffect } from 'react'
import * as Location from 'expo-location'

// San Francisco 37.4220936, -122.083922

const useGeolocation = () => {
    const [location, setLocation] = useState<any>(null)
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
