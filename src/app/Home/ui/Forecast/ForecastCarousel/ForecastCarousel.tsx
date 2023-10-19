import { Button, Text, View, Dimensions } from 'react-native'
import Carousel from 'react-native-reanimated-carousel';
import ForecastCard from '../ForecastCard/ForecastCard';
// import styles from './styles';

const ForecastCarousel = ({
    forecast
}: any) => {
    // const defaultWeatherItem = {
    //     "id": null,
    //     "main": "Clouds",
    //     "description": "broken clouds",
    //     "icon": "04d"
    //   }

    const data = forecast?.list || [];

    const width = Dimensions.get('window').width;
    // const width = 40;

    return (
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                style={{
                    width: width - 10,                    
                    // backgroundColor: 'yellow',
                }}
                width={(width / 4)}
                height={120}
                autoPlay={false}
                data={data}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index, item }) => (
                    <ForecastCard index={index} item={item} />
                )}
            />
        </View>
    )
}

export default ForecastCarousel