import { View, Dimensions } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import ForecastCard from '../ForecastCard/ForecastCard'

const ForecastCarousel = ({
    forecast,
    tempSymbol
}: any) => {
    const data = forecast?.list || [];

    const width = Dimensions.get('window').width;

    if (!forecast) return null

    return (
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                style={{
                    width: width - 10,
                }}
                width={(width / 4)}
                height={120}
                autoPlay={false}
                data={data}
                scrollAnimationDuration={1000}
                renderItem={({ index, item }) => (
                    <ForecastCard index={index} item={item} tempSymbol={tempSymbol} />
                )}
            />
        </View>
    )
}

export default ForecastCarousel