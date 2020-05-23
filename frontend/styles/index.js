import { StyleSheet } from 'react-native';


const uStyles = StyleSheet.create({
    dropShadow: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.00,
    
        elevation: 1,
      },
      centerContent: {
        marginTop: 12,
        alignItems: 'center',
        justifyContent: 'center',
      },
      horizontalStack: {
        marginTop: 32,
        flexDirection: 'row',
      },
      horizontalStackLeftAlign: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        marginTop: 32,
      },    
});

export default uStyles;