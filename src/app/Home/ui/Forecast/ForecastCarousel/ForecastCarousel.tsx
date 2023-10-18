import { Button, Text, View, Dimensions } from 'react-native'
import Carousel from 'react-native-reanimated-carousel';
// import styles from './styles';

const ForecastCarousel = ({
    city,
    forecast
}: any) => {
    // const defaultWeatherItem = {
    //     "id": null,
    //     "main": "Clouds",
    //     "description": "broken clouds",
    //     "icon": "04d"
    //   }

    const width = Dimensions.get('window').width;

    return (
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={false}
                data={[...new Array(6).keys()]}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>
                            {index}
                        </Text>
                    </View>
                )}
            />
        </View>
    )
}

export default ForecastCarousel