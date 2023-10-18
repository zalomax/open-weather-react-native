import { useEffect } from 'react'
import { Button, Text, View } from 'react-native'
import styles from './styles'
import IconWeather1 from './../../../assets/weather/weather1.svg'

const CityScreen = ({ route, navigation }: any) => {
    const { cityName } = route.params;

    return (
        <View style={styles.container}>
            <Text>City Screen!</Text>
            <Text>{cityName}</Text>
            <IconWeather1 width={120} height={40} />
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
}

export default CityScreen