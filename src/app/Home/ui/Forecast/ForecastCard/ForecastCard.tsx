import { Button, Text, View } from 'react-native'
import { format } from 'date-fns'
import { WeatherIconComponents } from '../../../consts';
import styles from './styles';

const ForecastCard = ({
    item,
    tempSymbol
}: any) => {    

    const date = new Date(item?.dt_txt);
    const timeText = format(date, 'H:mm')

    const weatherItem = item?.weather[0];
    const WeatherIcon = WeatherIconComponents[weatherItem?.icon] || WeatherIconComponents.default

    return (
        <View style={styles.wrapper}>
            <Text style={styles.text}>{timeText}</Text>
            <View style={styles.iconContainer}>
                <WeatherIcon style={styles.icon} width={40} height={40} />
            </View>
            <Text style={styles.tempText}>{item?.main?.temp_min} {tempSymbol}</Text>
        </View>
    );
}

export default ForecastCard