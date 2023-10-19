import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        backgroundColor: 'steelblue',    
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    row: {
        // flex: 1,
        width: '100%',
        // backgroundColor: 'green',
    },
    container: {
        // flex: 1,
        // width: '30%',
        // backgroundColor: 'green',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    iconContainer: {
        width: '10%',
        // backgroundColor: 'cyan',
    },
    iconText: {
        width: '40%',
        // backgroundColor: 'yellow',
    },
});

export default styles;