import React, { useCallback, useRef, useState } from 'react';
import {
  Box,
  CaptureButton,
  Classification,
  OverlayLoader,
} from '@app/components';
import { useMount } from '@app/lib/hooks';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { BackHandler, StatusBar, StyleSheet } from 'react-native';
import { useModelContext } from '@app/context/model';
import { ImageResult, manipulateAsync } from 'expo-image-manipulator';
import { hp } from '@app/lib/utils';

const App: React.FC = () => {
  const { loading } = useModelContext();
  const [photo, setPhoto] = useState<ImageResult>();
  const [capturing, setCapturing] = useState<boolean>(false);
  const [captured, setCaptured] = useState<boolean>(false);
  const cameraRef = useRef<Camera>();
  const [, requestPermission] = Camera.useCameraPermissions();

  useMount(async () => {
    const perm = await requestPermission();
    if (!perm.granted) {
      BackHandler.exitApp();
    }
  });

  const captureImage = useCallback(async () => {
    setCapturing(true);
    const res = await cameraRef.current?.takePictureAsync();
    const manipulated = await manipulateAsync(
      res?.uri!,
      [{ resize: { height: hp(65), width: hp(65) * 0.75 } }],
      { compress: 1 },
    );
    setCaptured(true);
    setCapturing(false);
    setTimeout(() => {
      setPhoto(manipulated);
    }, 100);
  }, []);

  const onRetake = useCallback(() => {
    setCaptured(false);
    setPhoto(undefined);
  }, []);

  return (
    <Box flex={1}>
      <OverlayLoader loading={loading} title='Loading model' />
      <StatusBar translucent={true} backgroundColor='transparent' />
      {!photo ? (
        <>
          <Camera
            ref={cameraRef as any}
            style={StyleSheet.absoluteFill}
            type={CameraType.back}
            ratio='4:3'
            flashMode={FlashMode.auto}
            focusable={true}
          />
          <CaptureButton
            captured={captured}
            onPress={captureImage}
            loading={capturing}
          />
        </>
      ) : (
        <Classification onRetake={onRetake} photo={photo} />
      )}
    </Box>
  );
};

export default App;
