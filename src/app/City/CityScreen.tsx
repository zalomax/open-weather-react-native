import { useEffect } from 'react'
import { Button, Text, View } from 'react-native'
import styles from './styles'

const CityScreen = ({ navigation }: any) => {

    return (
        <View style={styles.container}>
            <Text>City Screen!</Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
}

export default CityScreen