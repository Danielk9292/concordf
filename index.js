npm install -g react-native-cli
react-native init MeuProjeto
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';

export default function App() {
  const cameraRef = useRef(null);
  const [previewUri, setPreviewUri] = useState(null);

  async function takePicture() {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setPreviewUri(data.uri);
    }
  }

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
      />
      <Button title="Tirar Foto" onPress={takePicture} />
      {previewUri && <Image source={{ uri: previewUri }} style={styles.preview} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width: '100%',
    height: '80%',
  },
  preview: {
    width: '50%',
    height: '40%',
    marginTop: 10,
  },
});
