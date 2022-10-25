import { AnimatedBox, Box, SafeBox } from '@app/components/box';
import Button from '@app/components/Button';
import React, { useCallback, useState } from 'react';
import { ImageBackground, ToastAndroid } from 'react-native';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import * as FileSystem from 'expo-file-system';
import { util } from '@tensorflow/tfjs';
import { useModelContext } from '@app/context/model';
import OverlayLoader from '@app/components/OverlayLoader';
import { imageToTensor } from '@app/lib/utils/image.utils';
import PredictionTable, {
  Prediction,
} from '@app/components/classification/PredictionTable';
import { ImageResult } from 'expo-image-manipulator';

export interface ClassificationProps {
  photo: ImageResult;
  onRetake?: () => void;
}

const Classification: React.FC<ClassificationProps> = ({ photo, onRetake }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { model } = useModelContext();
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  const classifyImage = useCallback(async () => {
    try {
      setLoading(true);
      const imgB64 = await FileSystem.readAsStringAsync(photo.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const imgBuffer = util.encodeString(imgB64, 'base64').buffer;
      const raw = new Uint8Array(imgBuffer);
      const tensorImage = imageToTensor(raw);
      const pre = await model.classify(tensorImage);
      setPredictions(pre);
      setLoading(false);
    } catch (error) {
      await setLoading(false);
      ToastAndroid.showWithGravity(
        'Error occured!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  }, [model, photo.uri]);

  return (
    <AnimatedBox entering={FadeIn} exiting={FadeOut} flex={1} bg='oceanBlue'>
      <OverlayLoader loading={loading} title='Classifying...' />
      <SafeBox flex={1}>
        <Box mt='s'>
          <ImageBackground
            source={{ uri: photo.uri }}
            style={{
              height: photo.height,
            }}>
            {predictions.length ? (
              <PredictionTable predictions={predictions} />
            ) : null}
          </ImageBackground>
        </Box>
        <Box flex={1} />
        <Box
          flexDirection='row'
          justifyContent='center'
          alignItems='center'
          py='m'
          pb='xl'>
          <Button danger title='Retake' onPress={onRetake} />
          <Box width={20} />
          <Button title='Classify' onPress={classifyImage} />
        </Box>
      </SafeBox>
    </AnimatedBox>
  );
};

export default Classification;
