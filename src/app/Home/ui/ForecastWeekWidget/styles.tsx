import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        borderTopColor: 'white',
        borderTopWidth: 1,
        paddingTop: 10,
    },
    row: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 30
    },
    cell: {
        flex: 1,
        alignItems: 'center',
    },
    dayText: {
        fontSize: 14,
        color: 'white',
    },
    icon: {
        color: 'white',
    },
    tempText: {
        fontSize: 14,
        color: 'white',
    },
});

export default styles