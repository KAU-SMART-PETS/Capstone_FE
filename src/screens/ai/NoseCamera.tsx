import React, { useRef, useState } from 'react';
import { View, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useNavigation, useRoute } from '@react-navigation/native';

const NoseCamera = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { petId, petType, petName } = route.params;
  const cameraRef = useRef<RNCamera>(null);
  const [isTakingPicture, setIsTakingPicture] = useState(false);

  const takePicture = async () => {
    if (cameraRef.current && !isTakingPicture) {
      setIsTakingPicture(true);
      try {
        const options = { quality: 0.5, base64: false };
        const data = await cameraRef.current.takePictureAsync(options);
        console.log("디버깅 출력 (코 촬영 시) : ", data.uri, petId, petType, petName);
        navigation.navigate('ReadyToRegisterNose', { imageUri: data.uri, petId, petType, petName });
      } catch (error) {
        console.error("Error taking picture: ", error);
        Alert.alert("오류", "사진을 촬영하는 중 문제가 발생했습니다.");
      } finally {
        setIsTakingPicture(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
      >
        <View style={styles.overlay}>
          <View style={styles.instructionContainer}>
            <Text style={styles.instructionText}>사각형에 맞추어 찍어주세요</Text>
          </View>
          <View style={styles.frameMask}>
            <View style={styles.frame} />
          </View>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
        </View>
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  instructionContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  instructionText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
  frameMask: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
});

export default NoseCamera;
