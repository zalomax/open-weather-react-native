import { useEffect } from 'react'
import { Button, Text, View } from 'react-native'
import styles from './styles'
import MainLayout from '../../layouts/MainLayout'
import useLoadWeather from '../Home/hooks/useLoadWeather'
import { qParamCities } from '../Home/consts'
import SimpleWeatherWidget from '../Home/ui/SimpleWeatherWidget/SimpleWeatherWidget'

const CityScreen = ({ route, navigation }: any) => {
    const { cityName } = route.params;
    const { loadWeather, currentWeather, appError } = useLoadWeather()
    // console.log("222 ~ currentWeather:", JSON.stringify(currentWeather, null, '\t'))

    useEffect(() => {
        // console.log("333 ~ location:", location)
        if (cityName) {
            const q = qParamCities[cityName]

            const payload = {
                q,
            };

            loadWeather(payload)
        }
    }, [cityName])

    const hasLoading = !Boolean(currentWeather);

    return (
        <MainLayout hasLoading={hasLoading}>
            <View style={styles.container}>
                <View style={styles.row2}>
                    <SimpleWeatherWidget weatherData={currentWeather} />
                </View>
                <Button
                    title="Home"
                    onPress={() => navigation.navigate('Home')}
                />
            </View>
        </MainLayout>
    );
}

export default CityScreen