import { Text, View } from 'react-native'
import { useEffect } from 'react'
import useGeolocation from './hooks/useGeolocation'
import styles from './styles'
import useLoadWeather from './hooks/useLoadWeather'

const HomeScreen = () => {
    const { location } = useGeolocation()
    // console.log("111 ~ location:", location)
    const { loadWeather, currentWeather, appError } = useLoadWeather()
    // console.log("222 ~ currentWeather:", currentWeather)
    
    useEffect(() => {
        // console.log("333 ~ location:", location)
        if (location) {
            loadWeather()
        }
    }, [location])

    return (
        <View style={styles.container}>
            <Text>Home Screen!</Text>
        </View>
    );
}

export default HomeScreen