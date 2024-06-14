import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Camera } from 'expo-camera';

const CameraComponent = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync();
      console.log('Photo:', photo);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Acesso à câmera negado</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera 
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={(ref) => setCameraRef(ref)}
      />
      <Button title="Tirar Foto" onPress={takePicture} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});

export default CameraComponent;
