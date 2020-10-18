import { StyleSheet } from 'react-native'
import L from '../../constants/layout'

export default StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: L.borderRadius,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
  },
})
