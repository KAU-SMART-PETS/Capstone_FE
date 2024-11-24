import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useNavigation, useRoute } from '@react-navigation/native';


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
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
      >
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <Image source={require('../../assets/image/icon/camera.png')} style={styles.cameraIcon} />
        </TouchableOpacity>
      </RNCamera>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cameraContainer: {
    flex: 1,
    overflow: 'hidden',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  camera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guideBox: {
    width: '60%',
    height: '40%',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 10,
    position: 'absolute',
  },
  instructionText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 16,
    fontSize: 16,
  },
  captureButton: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  cameraIcon: {
    width: 60,
    height: 60,
  },
});

export default CustomCameraScreen;