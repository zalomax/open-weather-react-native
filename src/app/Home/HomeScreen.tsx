import { Button, Text, View } from 'react-native'
import { useEffect } from 'react'
import useGeolocation from './hooks/useGeolocation'
import styles from './styles'
import MainLayout from '../../layouts/MainLayout'
import SimpleWeatherWidget from './ui/SimpleWeatherWidget/SimpleWeatherWidget'
import useLoadWeather from './hooks/useLoadWeather'
import useLoadForecast from './hooks/useLoadForecast'
import Carousel from 'react-native-reanimated-carousel';
import ForecastCarousel from './ui/Forecast/ForecastCarousel/ForecastCarousel'

const HomeScreen = ({ navigation }: any) => {
    const { location } = useGeolocation()
    // console.log("111 ~ location:", JSON.stringify(location, null, '\t'))
    // const { loadWeather, currentWeather, appError } = useLoadWeather()
    // console.log("222 ~ currentWeather:", JSON.stringify(currentWeather, null, '\t'))
    const { loadForecast, forecast} = useLoadForecast()
    // console.log("222 ~ forecast:", JSON.stringify(!!forecast, null, '\t'))

    useEffect(() => {
        // console.log("333 ~ location:", location)
        if (location) {
            const payload = {
                lat: location.coords.latitude,
                lon: location.coords.longitude,
            };

            // loadWeather(payload)
            loadForecast(payload)
        }
    }, [location])

    // const hasLoading = !Boolean(currentWeather);
    const hasLoading = false;

    return (
        <MainLayout hasLoading={hasLoading}>
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text>Current Weather</Text>
                </View>
                {/* <View style={styles.row2}>
                    <SimpleWeatherWidget weatherData={currentWeather} />
                </View> */}
                <View style={styles.row2}>
                    <ForecastCarousel city={'Mountain View'} />
                </View>
                <View style={styles.footerWrapper}>
                    <Button
                        title="Go to City"
                        onPress={() => navigation.navigate('City', {
                            cityName: 'London,uk',
                        })}
                    />
                </View>
            </View>
        </MainLayout>
    );
}

export default HomeScreen