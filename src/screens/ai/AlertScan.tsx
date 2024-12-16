import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { RoundedTextButton } from '@common/RoundedButton';
import Instruction from './Instruction';
import ImageSelectionModal from './ImageSelectionModal';

const AlertScan: React.FC<{ route: RouteProp<RootStackParamList, "AlertScan"> }> = ({ route }) => {
  const navigation = useNavigation();
  const { scanType, petId, petType, petName } = route.params || {};
  const [imgUri, setImgUri] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  // 갤러리에서 이미지 선택
  const handleGallerySelect = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, (response) => {
      if (response.assets && response.assets[0]) {
        const imgUri = response.assets[0].uri;
        navigation.navigate('ScanPetResult', {
          scanType: scanType || '',
          imageUri: imgUri || '',
          petId: petId || '',
          petType: petType || '',
          petName: petName || '',
        });
      }
      setModalVisible(false);
    });
  };

  // 촬영하기 버튼 동작
  const handleTakePhoto = () => {
    setModalVisible(false);
    navigation.navigate('CameraView', {
      onPhotoTaken: (photoUri: string) => {
        navigation.navigate('ScanPetResult', {
          scanType,
          imageUri: photoUri,
          petId,
          petType,
          petName,
        });
      },
    });
  };

  // 준비 완료 버튼 클릭
  const handleReadyButtonPress = () => {
    setModalVisible(true); // 모달창 띄우기
  };

  return (
    <View className="flex-1 bg-white">
      <Instruction scanType={scanType} />
      {/* "준비 완료" 버튼 */}
      <View className="absolute bottom-4 left-0 right-0 items-center">
        <RoundedTextButton content="준비 완료" widthOption="xl" onPress={handleReadyButtonPress} />
      </View>
      {/* ModalLayout */}
      <ImageSelectionModal
        visible={isModalVisible}
        onClose={setModalVisible}
        onSelectCamera={handleTakePhoto}
        onSelectGallery={handleGallerySelect}
      />
    </View>
  );
};

export default AlertScan;
