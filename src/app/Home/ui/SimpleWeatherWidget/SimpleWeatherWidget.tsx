import { Text, View } from 'react-native'
import { WeatherIconComponents } from '../../consts';
import styles from './styles';

const SimpleWeatherWidget = ({
    weatherData,
    tempSymbol
}: any) => {
    const weatherItem = weatherData?.weather[0];

    const WeatherIcon = WeatherIconComponents[weatherItem?.icon] || WeatherIconComponents.default

    return (
        <View style={styles.wrapper}>
            <View style={styles.row}>
                <Text style={styles.nameText}>{weatherData?.name}</Text>
            </View>
            <View style={styles.row2}>
                <Text style={styles.tempText}>
                    {weatherData?.main?.temp} {tempSymbol}
                </Text>
            </View>
            <View style={styles.rowIcon}>
                <View style={styles.iconContainer}>
                    <WeatherIcon style={styles.icon} width={40} height={40} />
                    <Text style={styles.iconText}>{weatherItem?.main}</Text>
                </View>
            </View>
        </View>
    );
}

export default SimpleWeatherWidget