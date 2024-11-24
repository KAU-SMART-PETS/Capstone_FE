import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useNavigation, useRoute } from '@react-navigation/native';
import StylizedText from '@components/common/StylizedText';

const CustomCameraScreen = () => {
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
        console.log("디버깅 출력 (카메라 촬영 시) : ", data.uri, petId, petType);
        navigation.navigate('ReadyToScan', { imageUri: data.uri, petId, petType, petName });
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
          <Text style={styles.instructionText}>사각형에 맞추어 찍어주세요</Text>
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
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
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
  instructionText: {
    color: 'white',
    fontSize: 16,
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

export default CustomCameraScreen;
