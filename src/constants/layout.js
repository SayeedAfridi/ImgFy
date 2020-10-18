import { Dimensions } from 'react-native'

const window = Dimensions.get('window')

export default {
  height: window.height,
  width: window.width,
  borderRadius: 5,
}
