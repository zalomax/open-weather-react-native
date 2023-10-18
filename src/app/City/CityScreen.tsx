import { useEffect } from 'react'
import { Button, Text, View } from 'react-native'
import styles from './styles'

const CityScreen = ({ route, navigation }: any) => {
    const { cityName } = route.params;

    return (
        <View style={styles.container}>
            <Text>City Screen!</Text>
            <Text>{cityName}</Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
}

export default CityScreen