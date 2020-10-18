import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from './imagecard.styles'

const ImageCard = ({ image }) => {
  return (
    <View style={styles.container}>
      {image ? (
        <Image
          source={{ uri: image }}
          resizeMode="contain"
          style={styles.image}
        />
      ) : (
        <Text style={styles.text}>Add Image</Text>
      )}
    </View>
  )
}

export default ImageCard
