import { useState, useEffect } from 'react'
import { Button, Text, View } from 'react-native'
import styles from './styles'
import MainLayout from '../../layouts/MainLayout'
import useLoadWeather from '../Home/hooks/useLoadWeather'
import { qParamCities } from '../Home/consts'
import SimpleWeatherWidget from '../Home/ui/SimpleWeatherWidget/SimpleWeatherWidget'
import { WeatherData } from '../../api/v1/weather/WeatherData.types'

const CityScreen = ({ route, navigation }: any) => {
    const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null)

    const [lang, setLang] = useState<any>({ id: 'en' })

    const { cityName } = route.params;
    const { loadWeather } = useLoadWeather(setCurrentWeather, lang)
    console.log("222 ~ currentWeather:", JSON.stringify(currentWeather, null, '\t'))

    useEffect(() => {
        if (cityName) {
            const q = qParamCities[cityName]

            const payload = {
                q,
            };

            loadWeather(payload)
        }
    }, [cityName])

    const hasLoading = !Boolean(currentWeather);

    const tempSymbol = lang?.id === 'ru' ? '℃' : '℉'

    return (
        <MainLayout hasLoading={hasLoading}>
            <View style={styles.container}>
                <View style={styles.row2}>
                    <SimpleWeatherWidget weatherData={currentWeather} tempSymbol={tempSymbol}/>
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