import React from 'react'
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import styles from './button.styles'
import colors from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'

const Button = ({
  title,
  onPress,
  color,
  secondary,
  icon,
  textColor,
  style,
  block,
  loading,
}) => {
  const buttonStyle = {
    backgroundColor: color || secondary ? colors.accent : colors.primary,
    width: block ? '100%' : 'auto',
  }
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.container, buttonStyle, style]}>
      {icon && !loading ? (
        <Ionicons
          name={icon}
          style={{ marginRight: 8 }}
          size={16}
          color={textColor || 'white'}
        />
      ) : null}
      {loading ? (
        <ActivityIndicator
          style={{ marginRight: 8 }}
          size={16}
          color={textColor || 'white'}
        />
      ) : null}
      <Text
        style={[
          styles.title,
          {
            color: textColor || 'white',
          },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default Button
