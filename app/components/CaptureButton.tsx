import { Box, TouchBox } from '@app/components/box';
import { useTheme } from '@app/lib/hooks';
import { hp } from '@app/lib/utils';
import { Feather } from 'expo-vector-icons';
import React from 'react';
import { ActivityIndicator } from 'react-native';

export interface CaptureButtonProps {
  onPress?: () => void;
  loading?: boolean;
  captured?: boolean;
}

const btnSize = hp(7);

const CaptureButton: React.FC<CaptureButtonProps> = ({
  onPress,
  loading,
  captured,
}) => {
  const theme = useTheme();
  return (
    <TouchBox
      position='absolute'
      bottom={hp(8)}
      alignSelf='center'
      borderRadius='round'
      borderWidth={6}
      borderColor='white'
      style={{ padding: 2 }}
      onPress={!loading ? onPress : undefined}
      zIndex={9999}>
      {captured ? (
        <Feather name='check' size={btnSize} color={theme.colors.borderColor} />
      ) : loading ? (
        <ActivityIndicator size={btnSize} color={theme.colors.borderColor} />
      ) : (
        <Box
          height={btnSize}
          width={btnSize}
          borderRadius='round'
          bg='borderColor'
        />
      )}
    </TouchBox>
  );
};

export default CaptureButton;
