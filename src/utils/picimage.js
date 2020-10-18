import * as ImagePicker from 'expo-image-picker'
import { Platform, ToastAndroid } from 'react-native'

const pickImage = async (setImage) => {
  try {
    if (Platform.OS === 'ios') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!')
        return
      }
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    })
    if (!result.cancelled) {
      if (setImage) {
        setImage(result.uri)
      }
      return result.uri
    }
  } catch (error) {
    console.log(error)
    ToastAndroid.showWithGravity(
      'Error getting Image!',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    )
  }
}

export default pickImage
