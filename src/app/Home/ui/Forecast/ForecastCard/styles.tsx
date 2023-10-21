import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        backgroundColor: 'steelblue',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    iconContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 16,
    },
    container: {
    },
    text: {
        width: '100%',
        textAlign: 'center',
        fontSize: 12,
        color: 'white',
    },
    tempText: {
        width: '100%',
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
        marginTop: 6,
    },
    icon: {
        color: 'white',
    },
    iconText: {
        width: '40%',
    },
});

export default styles;