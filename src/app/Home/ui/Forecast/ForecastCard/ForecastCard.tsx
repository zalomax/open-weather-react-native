import { Button, Text, View } from 'react-native'
import { format } from 'date-fns'
import { WeatherIconComponents } from '../../../consts';
import styles from './styles';

const ForecastCard = ({
    index,
    item
}: any) => {    

    const date = new Date(item?.dt_txt);
    // console.log("333 ~ date:", JSON.stringify(date, null, '\t'))
    const timeText = format(date, 'H:mm')

    const weatherItem = item?.weather[0];
    const WeatherIcon = WeatherIconComponents[weatherItem?.icon] || WeatherIconComponents.default

    return (
        <View style={styles.wrapper}>
            <Text style={styles.text}>{timeText}</Text>
            <View style={styles.iconContainer}>
                <WeatherIcon style={styles.icon} width={40} height={40} />
            </View>
            <Text style={styles.tempText}>{item?.main?.temp_min} &#8457;</Text>
        </View>
    );
}

export default ForecastCard