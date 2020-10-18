import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'
import L from '../../constants/layout'

export default StyleSheet.create({
  container: {
    width: L.width - 100,
    height: L.width - 100,
    margin: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  text: {
    fontFamily: 'Poppins',
    fontSize: 20,
    color: colors.grey,
  },
})
