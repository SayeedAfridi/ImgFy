import React from 'react'
import { View, Text } from 'react-native'
import colors from '../../constants/colors'
import styles from './predictcard.styles'

const PredictCard = ({ prediction }) => {
  const { className, probability } = prediction
  const p = Math.round(probability * 100)
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{className.split(',')[0]}</Text>
      <Text
        style={[
          styles.text,
          {
            color: p > 50 ? colors.primaryLight : colors.accent,
          },
        ]}>
        {p}
      </Text>
    </View>
  )
}

export default PredictCard
