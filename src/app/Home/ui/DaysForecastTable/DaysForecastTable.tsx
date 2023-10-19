import { Button, Text, View } from 'react-native'
import { useEffect } from 'react'
import { WeatherIconComponents } from '../../consts';
import styles from './styles';

const DaysForecastTable = ({
    data
}: any) => {
    // const defaultWeatherItem = {
    //     "id": null,
    //     "main": "Clouds",
    //     "description": "broken clouds",
    //     "icon": "04d"
    //   }

   

    return (
        <View style={styles.wrapper}>
            {/* <View style={styles.row}>
                <Text style={styles.nameText}>{weatherData?.name}</Text>
            </View>
            <View style={styles.row2}>
                <Text style={styles.tempText}>
                    {weatherData?.main?.temp} &#8457;
                </Text>
            </View>
            <View style={styles.rowIcon}>
                <View style={styles.iconContainer}>
                    <WeatherIcon style={styles.icon} width={40} height={40} />
                    <Text style={styles.iconText}>{weatherItem?.main}</Text>
                </View>
            </View> */}
        </View>
    );
}

export default DaysForecastTable