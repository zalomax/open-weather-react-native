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
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import useLoadForecastWeek from './hooks/useLoadForecastWeek'

const HomeScreen = ({ navigation }: any) => {
    const { location } = useGeolocation()
    // console.log("111 ~ location:", JSON.stringify(location, null, '\t'))
    const { loadWeather, currentWeather, appError } = useLoadWeather()
    // console.log("222 ~ currentWeather:", JSON.stringify(currentWeather, null, '\t'))

    const { loadForecast, forecast } = useLoadForecast()
    const { loadForecastWeek, forecastWeek } = useLoadForecastWeek()
    // console.log("222 ~ forecast:", JSON.stringify(forecastWeek, null, '\t'))

    useEffect(() => {
        // console.log("333 ~ location:", location)
        if (location) {
            const payload = {
                lat: location.coords.latitude,
                lon: location.coords.longitude,
            };

            loadWeather(payload)
            loadForecast(payload)
            loadForecastWeek(payload)
        }
    }, [location])

    const hasLoading = !Boolean(currentWeather);
    // const hasLoading = false;

    const [selectedItem, setSelectedItem] = useState<any>(null);

    useEffect(() => {
        // console.log("333 ~ selectedItem:", selectedItem)
        if (selectedItem?.id) {
            navigation.navigate('City', {
                cityName: selectedItem?.id,
            })
        }
    }, [selectedItem])

    return (
        <MainLayout hasLoading={hasLoading}>
            <View style={styles.container}>
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
                {/* <View style={styles.row2}>
                    <ForecastCarousel city={'Mountain View'} />
                </View> */}
                <View style={styles.rowForecastWeek}>
                    <ForecastWeekWidget forecastWeek={forecastWeek} />
                </View>
                <View style={styles.footerWrapper}>
                    <Button
                        title="Go to City"
                        onPress={() => navigation.navigate('City', {
                            cityName: 'London',
                        })}
                    />
                </View>
            </View>
        </MainLayout>
    );
}

export default HomeScreen