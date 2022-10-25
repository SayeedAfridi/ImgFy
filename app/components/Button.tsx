import TouchBox from '@app/components/box/TouchBox';
import { Text } from '@app/components/text';
import React from 'react';

export interface ButtonProps {
  title: string;
  onPress?: () => void;
  danger?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, danger, onPress }) => {
  return (
    <TouchBox
      px='l'
      py='s'
      bg={!danger ? 'green' : 'danger'}
      borderRadius='s'
      onPress={onPress}>
      <Text variant='button'>{title}</Text>
    </TouchBox>
  );
};

export default Button;
