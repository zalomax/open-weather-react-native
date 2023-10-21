import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
    },
    row: {
        width: '100%',
        alignItems: 'center',
    },
    row2: {
        width: '100%',
        alignItems: 'center',
        height: 70
    },
    rowIcon: {
        width: '100%',
        alignItems: 'center',
        height: 40
    },
    iconContainer: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        width: '10%',
        color: 'white',
    },
    iconText: {
        width: '40%',
        fontSize: 22,
        color: 'white',
    },
    nameText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
    tempText: {
        fontSize: 48,
        fontWeight: '600',
        color: 'white',
    },
});

export default styles;