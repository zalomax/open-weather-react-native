import { Button, Text, View } from 'react-native'
import { useEffect } from 'react'
import useGeolocation from './hooks/useGeolocation'
import styles from './styles'
import useLoadWeather from './hooks/useLoadWeather'
import MainLayout from '../../layouts/MainLayout'
import SimpleWeatherWidget from './ui/SimpleWeatherWidget/SimpleWeatherWidget'

const HomeScreen = ({ navigation }: any) => {
    const { location } = useGeolocation()
    // console.log("111 ~ location:", JSON.stringify(location, null, '\t'))
    const { loadWeather, currentWeather, appError } = useLoadWeather()
    // console.log("222 ~ currentWeather:", JSON.stringify(currentWeather, null, '\t'))

    useEffect(() => {
        // console.log("333 ~ location:", location)
        if (location) {
            const payload = {
                lat: location.coords.latitude,
                lon: location.coords.longitude,
            };

            loadWeather(payload)
        }
    }, [location])

    const hasLoading = !Boolean(currentWeather);

    return (
        <MainLayout hasLoading={hasLoading}>
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text>Current Weather</Text>
                </View>
                <View style={styles.row2}>
                    <SimpleWeatherWidget weatherData={currentWeather} />
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