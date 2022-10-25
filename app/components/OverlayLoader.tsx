import { AnimatedBox } from '@app/components/box';
import { Text } from '@app/components/text';
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { FadeIn, FadeOut } from 'react-native-reanimated';

export interface OverlayLoaderProps {
  loading?: boolean;
  title?: string;
}

const OverlayLoader: React.FC<OverlayLoaderProps> = ({ loading, title }) => {
  if (!loading) return null;

  return (
    <AnimatedBox
      position='absolute'
      style={StyleSheet.absoluteFill}
      justifyContent='center'
      alignItems='center'
      entering={FadeIn}
      zIndex={9999999}
      exiting={FadeOut}
      bg='overlay'>
      <ActivityIndicator size='large' color='white' />
      {title ? (
        <Text mt='s' color='white'>
          {title}
        </Text>
      ) : undefined}
    </AnimatedBox>
  );
};

export default OverlayLoader;
