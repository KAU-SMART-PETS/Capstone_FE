import React, { useRef, useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { useRoute } from '@react-navigation/native';
import ColorMap from '@common/ColorMap';
import { BackArrowHeader } from '@src/components/HeaderBar';
import StylizedText from '@src/components/common/StylizedText';

interface CameraViewParams {
  onPhotoTaken: (photoUri: string) => void;
}

const CameraView: React.FC = () => {
  const route = useRoute();
  const { onPhotoTaken } = route.params as CameraViewParams;

  const cameraRef = useRef<Camera>(null);
  const device = useCameraDevice('back');
  const [hasPermission, setHasPermission] = useState(false);
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      const permissionStatus = await Camera.requestCameraPermission();
      setHasPermission(permissionStatus === 'granted');
    };
    requestPermission();
  }, []);

  const handlePhotoCapture = useCallback(async () => {
    if (cameraRef.current && isCameraInitialized) {
      try {
        setIsProcessing(true);
        const photo = await cameraRef.current.takePhoto();
        onPhotoTaken(`file://${photo.path}`);
      } catch (error) {
        console.error('Failed to capture photo:', error);
      } finally {
        setIsProcessing(false);
      }
    }
  }, [onPhotoTaken, isCameraInitialized]);

  if (!device) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color={ColorMap['primary']} />
        <Text className="text-white mt-2">카메라 디바이스를 로드 중입니다...</Text>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View className="flex-1 justify-center items-center bg-black px-5">
        <Text className="text-white text-lg text-center">
          카메라 권한이 필요합니다. 설정에서 권한을 허용해주세요.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      {/* Camera Component */}
      <Camera
        ref={cameraRef}
        device={device}
        isActive
        photo
        style={{ flex: 1 }}
        onInitialized={() => setIsCameraInitialized(true)}
        onError={(error) => console.error('Camera error:', error)}
      />
      <BackArrowHeader arrowColor='white' />
      <View className='w-full h-full flex-1 absolute justify-center items-center'>
        <View className='bottom-6 border-2 border-white w-60 h-60 rounded-2xl'/>
      </View>
      <View className="w-full flex-1 absolute inset-0 p-3 bottom-2">
        <View className='flex-1 justify-center items-center'>
          <StylizedText type="caption-body" styleClass="text-white/90 text-center mb-6">
            사각형에 맞추어 찍어주세요
          </StylizedText>
          {/* Capture Button */}
          {isProcessing ? (
            <ActivityIndicator size="large" color={ColorMap['primary']} />
          ) : (
            <TouchableOpacity
              onPress={handlePhotoCapture}
              className="w-16 h-16 bg-white border-4 border-neutral-400 bg-opacity-30 rounded-full mb-10 justify-center items-center"
            >
              <View className="w-14 h-14 bg-white rounded-full" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default CameraView;
