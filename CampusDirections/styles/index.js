import { StyleSheet } from 'react-native';

const width_proportion = '90%';

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
  listBoxFixed200: {
    width: width_proportion,
    height: 200,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderWidth: 1,
    borderColor: '#EEE',
    backgroundColor: '#EEE',
    color: '#fff',

  },
  listBoxFixed400: {
    width: width_proportion,
    height: 200,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderWidth: 1,
    borderColor: '#EEE',
    backgroundColor: '#EEE',
    color: '#fff',

  },
});

export default uStyles;