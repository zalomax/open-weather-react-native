import { Button, Text, View } from 'react-native'
import { useEffect } from 'react'
import { WeatherIconComponents } from '../../consts';
import styles from './styles';

const SimpleWeatherWidget = ({
    weatherData
}: any) => {
    // const defaultWeatherItem = {
    //     "id": null,
    //     "main": "Clouds",
    //     "description": "broken clouds",
    //     "icon": "04d"
    //   }

    const weatherItem = weatherData?.weather[0];
    // const cityName = weatherData || weatherData?.weather[0]

    // console.log("333 ~ weatherItem.icon:", JSON.stringify(weatherItem.icon, null, '\t'))
    const WeatherIcon = WeatherIconComponents[weatherItem?.icon] || WeatherIconComponents.default

    return (
        <View style={styles.wrapper}>
            <View style={styles.row}>
                <Text>{weatherData?.name}</Text>
            </View>
            <View style={styles.row}>
                <Text>{weatherData?.main?.temp} &#8457;</Text>
            </View>
            <View style={styles.row}>
                <View style={styles.container}>
                    <WeatherIcon style={styles.icon} width={40} height={40} />
                    <Text style={styles.iconText}>{weatherItem?.main}</Text>
                </View>
            </View>
        </View>
    );
}

export default SimpleWeatherWidget