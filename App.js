import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Text,
  ToastAndroid,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ImageCard from './src/components/imagecard/imagecard.comp'
import colors from './src/constants/colors'
import useCachedResources from './src/hooks/useCachedResources'
import Button from './src/components/button/button.comp'
import pickImage from './src/utils/picimage'
import * as tf from '@tensorflow/tfjs'
import * as mobilenet from '@tensorflow-models/mobilenet'
import { fetch } from '@tensorflow/tfjs-react-native'
import * as FileSystem from 'expo-file-system'
import imageToTensor from './src/utils/imageToTensor'
import PredictCard from './src/components/predictcard/predictcard.comp'

export default function App() {
  const isLoadingComplete = useCachedResources()
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [model, setModel] = useState(null)
  const [ldText, setText] = useState('Loading Tensorflow')
  const [predictions, setPredictions] = useState(null)

  useEffect(() => {
    setLoading(true)
    const init = async () => {
      try {
        await tf.ready()
        await setText('Loading Models')
        const m = await mobilenet.load()
        await setModel(m)
        setLoading(false)
      } catch (error) {
        await setLoading(false)
        console.log(error)
      }
    }
    init()
  }, [])

  const classifyImage = async () => {
    try {
      if (!image) {
        ToastAndroid.showWithGravity(
          'Please add image!',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        )
        return
      }
      await setText('Predicting')
      await setLoading(true)
      const imgB64 = await FileSystem.readAsStringAsync(image, {
        encoding: FileSystem.EncodingType.Base64,
      })
      const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer
      const raw = new Uint8Array(imgBuffer)
      const tensorImage = imageToTensor(raw, tf)
      const pre = await model.classify(tensorImage)
      await setPredictions(pre)
      setLoading(false)
    } catch (error) {
      await setLoading(false)
      console.log(error)
      ToastAndroid.showWithGravity(
        'Error occured!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      )
    }
  }

  if (!isLoadingComplete) {
    return null
  }
  return (
    <ScrollView>
      <StatusBar
        translucent={false}
        style="light"
        backgroundColor={colors.primary}
      />
      <Modal
        visible={loading}
        animationType="fade"
        onRequestClose={() => setLoading(false)}
        transparent={true}>
        <View style={styles.modalView}>
          <ActivityIndicator size={64} color="#fff" />
          <Text style={styles.modelText}>{ldText}</Text>
        </View>
      </Modal>
      <View style={styles.container}>
        <ImageCard image={image} />
        <View style={styles.btnContainer}>
          <Button
            onPress={() => pickImage(setImage)}
            title={image ? 'change Image' : 'Add Image'}
            icon={!image ? 'ios-add' : 'ios-refresh'}
            style={styles.btn}
          />
          <Button
            secondary
            title="Classify"
            icon="ios-list"
            style={styles.btn}
            onPress={classifyImage}
          />
        </View>
        {predictions ? (
          <>
            <Text
              style={{
                marginVertical: 10,
                fontFamily: 'Poppins',
                fontSize: 22,
              }}>
              Predictions
            </Text>
            {predictions.map((p, i) => (
              <PredictCard prediction={p} key={i} />
            ))}
          </>
        ) : null}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 10,
  },
  btn: {
    marginHorizontal: 10,
  },
  modalView: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modelText: {
    fontFamily: 'Poppins',
    fontSize: 22,
    color: '#fff',
    marginVertical: 20,
  },
})
