import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        backgroundColor: 'steelblue',
        // backgroundColor: 'skyblue',    
        // flexDirection: 'row',
        // flexWrap: 'wrap',    
        // alignItems: 'center',
    },
    row: {
        // flex: 1,
        width: '100%',
        backgroundColor: 'green',
        alignItems: 'center',
        height: 30
    },
    row2: {
        // flex: 1,
        width: '100%',
        backgroundColor: 'cyan',
        alignItems: 'center',        
        height: 70
    },
    rowIcon: {
        // flex: 1,
        width: '100%',
        backgroundColor: 'orange',
        alignItems: 'center',
        height: 40
    },
    iconContainer: {
        // flex: 1,
        width: '40%',
        backgroundColor: 'red',
        flexDirection: 'row',
        // columnGap: 20,
        justifyContent: 'space-between',
    },
    icon: {
        width: '10%',
        // backgroundColor: '#f80',
        // color: 'red',
        color: 'white',
        // color: '#333333',
    },
    nameText: {
        // width: '40%',
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        // backgroundColor: 'yellow',
    },
    tempText: {
        // width: '40%',
        fontSize: 48,
        fontWeight: '600',
        color: 'white',
        // backgroundColor: 'yellow',
    },
    iconText: {
        width: '40%',
        fontSize: 22,
        color: 'white',
        // backgroundColor: 'yellow',
    },
});

export default styles;