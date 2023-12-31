import { Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import useGeolocation from './hooks/useGeolocation'
import styles from './styles'
import MainLayout from '../../layouts/MainLayout'
import SimpleWeatherWidget from './ui/SimpleWeatherWidget/SimpleWeatherWidget'
import useLoadWeather from './hooks/useLoadWeather'
import useLoadForecast from './hooks/useLoadForecast'
import ForecastCarousel from './ui/Forecast/ForecastCarousel/ForecastCarousel'
import ForecastWeekWidget from './ui/ForecastWeekWidget/ForecastWeekWidget'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import useLoadForecastWeek from './hooks/useLoadForecastWeek'
import NetInfo from '@react-native-community/netinfo'
import { WeatherData } from '../../api/v1/weather/WeatherData.types'
import useLoadCachedData from './hooks/useLoadCachedData'
import { ForecastData } from '../../api/v1/forecast/ForecastData.types'

const HomeScreen = ({ navigation }: any) => {
    const [isConnected, setIsConnected] = useState<boolean | null>(null)

    const [lang, setLang] = useState<any>({ id: 'en' })

    const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null)
    const [forecast, setForecast] = useState<ForecastData | null>(null)
    const [forecastWeek, setForecastWeek] = useState<ForecastData | null>(null)

    const { loadCachedData, cachedText } = useLoadCachedData({
        setCurrentWeather,
    })

    const { location } = useGeolocation()
    const { loadWeather } = useLoadWeather(setCurrentWeather, lang)

    const { loadForecast } = useLoadForecast(setForecast, lang)
    const { loadForecastWeek } = useLoadForecastWeek(setForecastWeek, lang)

    useEffect(() => {
        NetInfo.fetch().then(state => {
            setIsConnected(state.isConnected)
        });
    }, [])

    useEffect(() => {
        if (isConnected) {
            if (location) {
                const payload = {
                    lat: location.coords.latitude,
                    lon: location.coords.longitude,
                };

                loadWeather(payload)
                loadForecast(payload)
                loadForecastWeek(payload)
            }
        } else if (isConnected === false) {
            loadCachedData()
        }
    }, [location, isConnected, lang])

    const [selectedItem, setSelectedItem] = useState<any>(null);

    useEffect(() => {
        if (selectedItem?.id) {
            navigation.navigate('City', {
                cityName: selectedItem?.id,
            })
        }
    }, [selectedItem])

    const hasLoading = !Boolean(currentWeather);
    // const hasLoading = !Boolean(currentWeather && forecast && forecastWeek);

    const tempSymbol = lang?.id === 'ru' ? '℃' : '℉'

    return (
        <MainLayout hasLoading={hasLoading}>
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.lang}>
                        <AutocompleteDropdown
                            clearOnFocus={false}
                            closeOnBlur={true}
                            closeOnSubmit={false}
                            showClear={false}
                            useFilter={false}
                            initialValue={lang}
                            onSelectItem={setLang}
                            dataSet={[
                                { id: 'en', title: 'En' },
                                { id: 'ru', title: 'Ru' },
                            ]}
                        />
                    </View>
                </View>
                {cachedText && (
                    <Text style={styles.cachedText}>
                        {cachedText}
                    </Text>
                )}
                <View style={styles.row}>
                    <AutocompleteDropdown
                        clearOnFocus={false}
                        closeOnBlur={true}
                        closeOnSubmit={false}
                        onSelectItem={setSelectedItem}
                        dataSet={[
                            { id: 'San Francisco', title: 'San Francisco' },
                            { id: 'Baltimore', title: 'Baltimore' },
                            { id: 'London', title: 'London' },
                        ]}
                    />
                </View>
                <View style={styles.row2}>
                    <SimpleWeatherWidget weatherData={currentWeather} tempSymbol={tempSymbol} />
                </View>
                <View style={styles.row3}>
                    <ForecastCarousel forecast={forecast} tempSymbol={tempSymbol} />
                </View>
                <View style={styles.rowForecastWeek}>
                    <ForecastWeekWidget forecastWeek={forecastWeek} tempSymbol={tempSymbol} />
                </View>
            </View>
        </MainLayout>
    );
}

export default HomeScreen