import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, SafeAreaView, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import emptyCircleFrame from '@image/frame/addPetCircle.png';

const PetRegister = () => {
  const navigation = useNavigation();

  const [petType, setPetType] = useState<'강아지' | '고양이' | ''>('');
  const [gender, setGender] = useState<'암' | '수' | ''>('');
  const [petImage, setPetImage] = useState<any>(null);
  const [name, setName] = useState<string>('');
  const [breed, setBreed] = useState<string>(''); 
  const [weight, setWeight] = useState<string>(''); 
  const [age, setAge] = useState<string>(''); 

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
        setPetImage(response.assets[0]); // 이미지 정보 전체를 저장
      }
    });
  };

  const handleSubmit = async () => {
    if (!name || !petType || !gender || !weight || !age) {
      Alert.alert('오류', '모든 필수 정보를 입력해주세요.');
      return;
    }

    try {
      const jsessionid = await AsyncStorage.getItem('JSESSIONID');
      if (!jsessionid) {
        Alert.alert('오류', '로그인이 필요합니다.');
        return;
      }

      const petTypeValue = petType === '강아지' ? 0 : 1; 
      const genderValue = gender === '암' ? 0 : 1; 

      const formData = new FormData();

      // formData에 각 필드 추가
      formData.append('name', name);
      formData.append('petType', petTypeValue);
      formData.append('gender', genderValue);
      formData.append('weight', parseFloat(weight));
      formData.append('age', parseInt(age));
      formData.append('breed', breed);

      if (petImage) {
        formData.append('image', {
          uri: petImage.uri,
          type: petImage.type || 'image/jpeg',
          name: petImage.fileName || 'pet_image.jpg',
        });
      }

      const response = await fetch('http://52.79.140.133:8080/api/v1/pets', {
        method: 'POST',
        headers: {
          'Cookie': `JSESSIONID=${jsessionid}`,
        },
        body: formData,
      });

      if (response.ok) {
        Alert.alert('성공', '반려동물이 등록되었습니다.');
        navigation.goBack();
      } else {
        const errorData = await response.text();
        console.error('반려동물 등록 에러:', errorData);
        Alert.alert('오류', '반려동물 등록 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('반려동물 데이터 전송 에러:', error);
      Alert.alert('오류', '반려동물 등록 중 오류가 발생했습니다.');
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

export default PetRegister;
