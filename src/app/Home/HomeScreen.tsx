import { Button, Text, View } from 'react-native'
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
import NetInfo from "@react-native-community/netinfo"
import { WeatherData } from '../../api/v1/weather/WeatherData.types'
import useLoadCachedData from './hooks/useLoadCachedData'
import { ForecastData } from '../../api/v1/forecast/ForecastData.types'

const HomeScreen = ({ navigation }: any) => {
    const [isConnected, setIsConnected] = useState<boolean | null>(null)
    
    const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null)
    const [forecast, setForecast] = useState<ForecastData | null>(null)
    const [forecastWeek, setForecastWeek] = useState<ForecastData | null>(null)

    const { loadCachedData, cachedText, setCachedText } = useLoadCachedData({
        setCurrentWeather,
        setForecast,
        setForecastWeek,
    })


    const { location } = useGeolocation()
    // console.log("111 ~ location:", JSON.stringify(location, null, '\t'))
    const { loadWeather } = useLoadWeather(setCurrentWeather)
    // console.log("222 ~ currentWeather:", JSON.stringify(currentWeather, null, '\t'))

    const { loadForecast } = useLoadForecast(setForecast)
    const { loadForecastWeek } = useLoadForecastWeek(setForecastWeek)
    // console.log("222 ~ forecast:", JSON.stringify(forecastWeek, null, '\t'))

    useEffect(() => {
        NetInfo.fetch().then(state => {
            // console.log("111 Connection type", state.type);
            setIsConnected(state.isConnected)
        });
    }, [])

    useEffect(() => {
        // console.log("333 ~ location:", location)
        // console.log("111 isConnected", isConnected)
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
    }, [location, isConnected])
    
    const [selectedItem, setSelectedItem] = useState<any>(null);

    useEffect(() => {
        // console.log("333 ~ selectedItem:", selectedItem)
        if (selectedItem?.id) {
            navigation.navigate('City', {
                cityName: selectedItem?.id,
            })
        }
    }, [selectedItem])

    const hasLoading = !Boolean(currentWeather);
    // const hasLoading = !Boolean(currentWeather && forecast && forecastWeek);
    // const hasLoading = false;   

    return (
        <MainLayout hasLoading={hasLoading}>
            <View style={styles.container}>
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
                        // initialValue={{ id: '2' }} // or just '2'
                        onSelectItem={setSelectedItem}
                        dataSet={[
                            { id: 'San Francisco', title: 'San Francisco' },
                            { id: 'Baltimore', title: 'Baltimore' },
                            { id: 'London', title: 'London' },
                        ]}
                    />
                </View>
                <View style={styles.row2}>
                    <SimpleWeatherWidget weatherData={currentWeather} />
                </View>
                <View style={styles.row3}>
                    <ForecastCarousel forecast={forecast} />
                </View>            
                <View style={styles.rowForecastWeek}>
                    <ForecastWeekWidget forecastWeek={forecastWeek} />
                </View>
                {/* <View style={styles.footerWrapper}>
                    <Button
                        title="Go to City"
                        onPress={() => navigation.navigate('City', {
                            cityName: 'London',
                        })}
                    />
                </View> */}
            </View>
        </MainLayout>
    );
}

export default HomeScreen