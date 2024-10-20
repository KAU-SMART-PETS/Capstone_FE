import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import TeethFrame from '@image/frame/teeth.png';
import EyeFrame from '@image/frame/eye.png';
import HairFrame from '@image/frame/hair.png';
import RegisterPhoto from '@image/frame/registerPhoto.png';

const SelectPart = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const options = [
    { id: 'teeth', icon: TeethFrame },
    { id: 'eye', icon: EyeFrame },
    { id: 'hair', icon: HairFrame },
  ];

  const handleOptionSelect = (id) => {
    setSelectedOption(id);
  };

  const handlePhotoButton = () => {
    setModalVisible(true);
  };

  const handleBackButton = () => {
    navigation.goBack();
  };

  const handleGallery = () => {
    setModalVisible(false);
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        console.log('Selected image: ', response.assets[0].uri);
        // 여기서 선택된 이미지
      }
    });
  };

  const handleCamera = () => {
    setModalVisible(false);
    navigation.navigate('Camera');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>촬영 시</Text>
      </View>
      
      <Text style={styles.subText}>
        반려 동물의 치아, 동공, 견모가 잘 보일 수 있도록 찍어주세요.
      </Text>
      
      <TouchableOpacity style={styles.photoButton} onPress={handlePhotoButton}>
        <Image source={RegisterPhoto} style={styles.photoButtonImage} />
      </TouchableOpacity>
      
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionButton,
              selectedOption === option.id && styles.selectedOption,
            ]}
            onPress={() => handleOptionSelect(option.id)}
          >
            <Image source={option.icon} style={styles.optionIcon} resizeMode="contain" />
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalButton} onPress={handleGallery}>
              <Text style={styles.modalButtonText}>갤러리에서 가져오기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleCamera}>
              <Text style={styles.modalButtonText}>촬영하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
    paddingBottom: 60,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'left',
    paddingTop: 90,
  },
  subText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  photoButton: {
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
    marginBottom: 40,
  },
  photoButtonImage: {
    width: 150,
    height: 150,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  optionButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  selectedOption: {
    backgroundColor: '#e6e6e6',
  },
  optionIcon: {
    width: 80,
    height: 80,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalButton: {
    backgroundColor: '#7EB6BE',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default SelectPart;
