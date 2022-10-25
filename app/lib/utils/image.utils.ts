import { decodeJpeg } from '@tensorflow/tfjs-react-native';

export const imageToTensor = (rawImageData: Uint8Array) => {
  return decodeJpeg(rawImageData);
};
