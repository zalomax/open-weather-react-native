import { Button, Text, View, FlatList } from 'react-native'
import styles from './styles'
import { format } from 'date-fns'
import { WeatherIconComponents } from '../../consts'

const ForecastWeekWidget = ({
    forecastWeek
}: any) => {
    return (
        <View style={styles.wrapper}>
            <FlatList
                data={forecastWeek?.list}
                scrollEnabled={false}
                renderItem={({ item }: any) => {
                    const dayText = format(new Date(item?.dt_txt), 'EE')

                    const weatherItem = item?.weather[0];
                    const WeatherIcon = WeatherIconComponents[weatherItem?.icon] || WeatherIconComponents.default

                    return (
                        <View style={styles.row}>
                            <View style={styles.cell}>
                                <Text style={styles.dayText}>{dayText}</Text>
                            </View>
                            <View style={styles.cell}>
                                <WeatherIcon style={styles.icon} width={20} height={20} />
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.tempText}>
                                    {item?.main?.temp_min}  &#8457;
                                </Text>
                            </View>
                        </View>
                    )
                }}
            />
        </View>
    );
}

export default ForecastWeekWidget