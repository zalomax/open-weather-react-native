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
        // flex: 1,
        width: '100%',
        // backgroundColor: 'green',
        alignItems: 'center',
        marginTop: 16,
    },
    container: {
        // flex: 1,
        // width: '30%',
        // backgroundColor: 'green',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    text: {
        // width: '40%',
        width: '100%',
        textAlign: 'center',
        fontSize: 12,
        // fontWeight: '400',
        color: 'white',
        // backgroundColor: 'yellow',
    },
    tempText: {
        // width: '40%',
        width: '100%',
        fontSize: 18,
        textAlign: 'center',
        // fontWeight: '400',
        color: 'white',
        marginTop: 6,
        // backgroundColor: 'yellow',
    },
    icon: {
        // width: '10%',
        // alignSelf: 'center',
        color: 'white',
    },
    iconText: {
        width: '40%',
        // backgroundColor: 'yellow',
    },
});

export default styles;