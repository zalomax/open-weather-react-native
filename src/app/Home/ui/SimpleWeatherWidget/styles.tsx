import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    wrapper: {
        // flex: 1,
        width: '100%',
        // backgroundColor: '#999',
        // backgroundColor: 'red',    
        // flexDirection: 'row',
        // flexWrap: 'wrap',    
        // alignItems: 'center',
        // height: 200        
    },
    row: {
        // flex: 1,
        width: '100%',
        // backgroundColor: 'green',
        alignItems: 'center',
        // height: 30
    },
    row2: {
        // flex: 1,
        width: '100%',
        // backgroundColor: 'cyan',
        alignItems: 'center',        
        height: 70
    },
    rowIcon: {
        // flex: 1,
        width: '100%',
        // backgroundColor: 'orange',
        alignItems: 'center',
        height: 40
    },
    iconContainer: {
        // flex: 1,
        width: '50%',
        // backgroundColor: 'red',
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
    iconText: {
        width: '40%',
        fontSize: 22,
        color: 'white',
        // backgroundColor: 'yellow',
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
});

export default styles;