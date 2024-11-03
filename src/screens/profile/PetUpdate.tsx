import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, SafeAreaView, Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import emptyCircleFrame from '@image/frame/addPetCircle.png';
import { PetRegistRequest } from '@src/utils/constants/types';
import { updatePetRegistration } from '@src/api/petApi';

const PetUpdate = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { petId } = route.params;

  const [petType, setPetType] = useState<'강아지' | '고양이' | ''>('');
  const [gender, setGender] = useState<'암' | '수' | ''>('');
  const [petImage, setPetImage] = useState<any>(null);
  const [name, setName] = useState<string>('');
  const [breed, setBreed] = useState<string>(''); 
  const [weight, setWeight] = useState<string>(''); 
  const [age, setAge] = useState<string>(''); 

  useEffect(() => {
    const loadPetData = async () => {
      try {
        const petDataString = await AsyncStorage.getItem(`PET_${petId}`);
        if (petDataString) {
          const petData = JSON.parse(petDataString);
          setName(petData.name || '');
          setPetType(petData.petType === 'DOG' ? '강아지' : '고양이');
          setGender(petData.gender === 'FEMALE' ? '암' : '수');
          setWeight(petData.weight ? petData.weight.toString() : '');
          setAge(petData.age ? petData.age.toString() : '');
          setBreed(petData.breed || '');
          setPetImage(petData.imageUrl ? { uri: petData.imageUrl } : null);
        }
      } catch (error) {
        console.error('Error loading pet data:', error);
        Alert.alert('오류', '반려동물 정보를 불러오는데 실패했습니다.');
      }
    };

    loadPetData();
  }, [petId]);

  const handleBackButton = () => {
    navigation.goBack();
  };

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets[0]) {
        setPetImage(response.assets[0]); 
      }
    });
  };

  const handleSubmit = async () => {
    const petData: PetRegistRequest = {
      name,
      petType: petType === '강아지' ? 2 : 1,
      gender: gender === '암' ? 2 : 1,
      weight: parseFloat(weight),
      age: parseInt(age),
      image: petImage?.uri || '',
    };
    try {
      await updatePetRegistration(petData, petId, navigation);
  
      // Update AsyncStorage with the latest pet data
      const updatedPetData = {
        name,
        petType: petType === '강아지' ? 'DOG' : 'CAT',
        gender: gender === '암' ? 'FEMALE' : 'MALE',
        weight: parseFloat(weight),
        age: parseInt(age),
        imageUrl: petImage?.uri || null,
        breed,
      };
      await AsyncStorage.setItem(`PET_${petId}`, JSON.stringify(updatedPetData));
  
      Alert.alert('성공', '반려동물 정보가 업데이트되었습니다.');
      navigation.goBack();
    } catch (error) {
      console.error('반려동물 업데이트 에러:', error);
      Alert.alert('오류', '반려동물 정보 업데이트 중 오류가 발생했습니다.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
            <Text style={styles.backButtonText}>{'<'}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleImagePick} style={styles.imageContainer}>
            <Image 
              source={petImage ? { uri: petImage.uri } : emptyCircleFrame} 
              style={styles.image} 
            />
            <Text style={styles.imageText}>눌러서 사진 변경</Text>
          </TouchableOpacity>
          
          <TextInput
            style={styles.input}
            placeholder="이름"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="견종 / 묘종"
            placeholderTextColor="#888"
            value={breed}
            onChangeText={setBreed}
          />
          <TextInput
            style={styles.input}
            placeholder="체중 (kg)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />
          <TextInput
            style={styles.input}
            placeholder="나이"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />

          <View style={styles.optionContainer}>
            <View style={styles.optionButtons}>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setPetType('강아지')}
              >
                <View style={[styles.checkbox, petType === '강아지' && styles.checkedBox]}>
                  {petType === '강아지' && <View style={styles.innerCircle} />}
                </View>
                <Text style={styles.checkboxLabel}>강아지</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setPetType('고양이')}
              >
                <View style={[styles.checkbox, petType === '고양이' && styles.checkedBox]}>
                  {petType === '고양이' && <View style={styles.innerCircle} />}
                </View>
                <Text style={styles.checkboxLabel}>고양이</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.spacer} />

          <View style={styles.optionContainer}>
            <View style={styles.optionButtons}>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setGender('암')}
              >
                <View style={[styles.checkbox, gender === '암' && styles.checkedBox]}>
                  {gender === '암' && <View style={styles.innerCircle} />}
                </View>
                <Text style={styles.checkboxLabel}>암</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.checkboxContainerSex}
                onPress={() => setGender('수')}
              >
                <View style={[styles.checkbox, gender === '수' && styles.checkedBox]}>
                  {gender === '수' && <View style={styles.innerCircle} />}
                </View>
                <Text style={styles.checkboxLabel}>수</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>저장하기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  backButtonText: {
    fontSize: 24,
    color: '#888',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  imageText: {
    marginTop: 10,
    color: '#888',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    width: '100%',
    color: '#888',
  },
  optionContainer: {
    marginBottom: 20,
    width: '100%',
  },
  optionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    paddingRight: 85,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  checkboxContainerSex: {
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkedBox: {
    backgroundColor: '#007AFF',
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#000',
  },
  submitButton: {
    backgroundColor: 'skyblue',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  spacer: {
    height: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  deviceItem: {
    padding: 10,
    borderBottomWidth: 1,
    color: 'black',
    borderBottomColor: '#ccc',
  },
  deviceId: {
    fontSize: 12,
    color: '#888',
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 20,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
  },
  bluetoothText: {
    color: '#888',
  },
});

export default PetUpdate;
