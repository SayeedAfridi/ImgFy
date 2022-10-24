import * as ImagePicker from 'expo-image-picker'
import { ToastAndroid } from 'react-native'

import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

const pickImage = async (setImage) => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!')
      return
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,

    })
    if (!result.cancelled) {
      const manRes = await manipulateAsync(
        result.uri,
        [{ resize: { height: 500, width: 500 } }],
        { compress: 1, format: SaveFormat.JPEG },
      );
      if (setImage) {
        setImage(manRes.uri)
      }
      return manRes.uri
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
