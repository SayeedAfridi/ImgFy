import React from 'react';
import { AnimatedBox, Box } from '@app/components/box';
import { Text } from '@app/components/text';
import { FadeInDown, FadeOutUp } from 'react-native-reanimated';

export type Prediction = {
  className: string;
  probability: number;
};

export interface PredictionTableProps {
  predictions: Prediction[];
}

const PredictionTable: React.FC<PredictionTableProps> = ({ predictions }) => {
  return (
    <AnimatedBox
      entering={FadeInDown}
      exiting={FadeOutUp}
      position='absolute'
      bottom={0}
      p='m'
      bg='overlay'
      width='100%'>
      {predictions.map(p => (
        <Item key={p.className} title={p.className} value={p.probability} />
      ))}
    </AnimatedBox>
  );
};

interface ItemProps {
  title: string;
  value: number;
}

const Item: React.FC<ItemProps> = ({ title, value }) => {
  const integerValue = value * 100;
  const color = integerValue >= 50 ? 'green' : 'danger';
  return (
    <Box
      mb='s'
      flexDirection='row'
      alignItems='center'
      justifyContent='space-between'>
      <Text textTransform='capitalize' color={color}>
        {title.split(',')[0]}
      </Text>
      <Text color={color}>{integerValue.toFixed(2) + '%'}</Text>
    </Box>
  );
};

export default PredictionTable;
