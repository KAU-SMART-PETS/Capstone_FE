import React, { useRef, useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';


const CameraScreen: React.FC = () => {
  const navigation = useNavigation();
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.find(d => d.position === 'back');
  const [photoPath, setPhotoPath] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const newCameraPermission = await Camera.requestCameraPermission();
      setHasPermission(newCameraPermission === 'authorized');
    })();
  }, []);

 
  const handlePhotoTaken = useCallback((path: string) => {
    setPhotoPath(path);
    
  }, []);

  const takePhoto = useCallback(async () => {
    if (camera.current) {
      try {
        const photo = await camera.current.takePhoto();
        handlePhotoTaken(photo.path);  
      } catch (error) {
        console.error('Failed to take photo:', error);
      }
    }
  }, [camera, handlePhotoTaken]);

  const retakePhoto = useCallback(() => {
    setPhotoPath(null); 
  }, []);


  return (
      <View style={styles.container}>
        {photoPath ? (
          <View style={styles.previewContainer}>
            
            <Image source={{ uri: `file://${photoPath}` }} style={styles.previewImage} />
            <View style={styles.analysisPromptContainer}> 
              <Text style={styles.analysisPrompt}>
                분석을 원하시면 분석 버튼을 눌러주세요
              </Text>
            </View>
            <View style={styles.previewButtons}>
                  
            <TouchableOpacity onPress={retakePhoto} style={styles.retakeButton}>
              <Text style={styles.buttonText}>다시 찍기</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Analysis')} style={styles.confirmButton}>
              <Text style={styles.buttonText}>분석</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
          />
          <View style={styles.overlay}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Text style={styles.backButtonText}>{"<"}</Text>
            </TouchableOpacity>
            <View style={styles.frameMask}>
              <View style={styles.frame} />
            </View>
            <Text style={styles.instructionText}>사각형에 맞추어 찍어주세요</Text>
            <TouchableOpacity onPress={takePhoto} style={styles.captureButton}>
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
          </View>
        </>
      )}
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
    marginBottom: 20,
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
  backButton: {
    position: 'absolute',
    top: 20,
    left: 30,
    zIndex: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 30,
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  previewImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  previewButtons: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '80%', 
    marginTop: 20,
  },
  retakeButton: {
    backgroundColor: '#73A8BA',
    paddingVertical: 10,
    paddingHorizontal: 20, 
    borderRadius: 30, 
    flex: 1, 
    marginRight: 10, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#73A8BA',
    paddingVertical: 10,
    paddingHorizontal: 20, 
    borderRadius: 30, 
    flex: 1, 
    marginLeft: 10, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  analysisPromptContainer: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 20,
    borderRadius: 15,
    marginTop: 0,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
},
analysisPrompt: {
  color: 'black',
  fontSize: 13,
  textAlign: 'center',
  marginTop: 0,
  marginBottom: 0,
},
});

export default CameraScreen;
