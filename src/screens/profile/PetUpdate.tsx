import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import emptyCircleFrame from '@image/frame/addPetCircle.png';
import { PetRegistRequest } from '@src/utils/constants/types';
import { updatePetRegistration } from '@src/api/petApi';
import CustomTextInput from '@src/components/common/CustomTextInput';
import { RoundedCircleButton, RoundedTextButton } from '@src/components/common/RoundedButton';
import StylizedText from '@src/components/common/StylizedText';
import Avatar from '@src/components/common/Avatar';

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

      // 최신 반려동물 데이터를 AsyncStorage에 업데이트
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
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-5">
        <View className="flex items-center">
          {/* 뒤로 가기 버튼 */}
          <TouchableOpacity onPress={handleBackButton} className="absolute top-5 left-5">
            <Text className="text-2xl text-gray-500">{'<'}</Text>
          </TouchableOpacity>

          {/* 반려동물 이미지 */}
          <View className="mb-6 mt-20">
            <RoundedCircleButton color="bg-white" shadow={false} size={100} onPress={handleImagePick}>
              <Avatar 
                source={petImage ? { uri: petImage.uri } : emptyCircleFrame}  
                size={150}
              />
            </RoundedCircleButton>
            <View className="mt-10">
              <StylizedText type="body1">눌러서 사진 변경</StylizedText>
            </View>
          </View>

          {/* 입력 필드 */}
          <CustomTextInput label="이름" placeholder="이름을 입력하세요" value={name} onChangeText={setName} keyboardType="default" />
          <CustomTextInput label="견종/묘종" placeholder="견종 / 묘종을 입력하세요" value={breed} onChangeText={setBreed} keyboardType="default" />
          <CustomTextInput label="체중(kg)" placeholder="체중 (kg)을 입력하세요" value={weight} onChangeText={setWeight} keyboardType="numeric" />
          <CustomTextInput label="나이" placeholder="나이를 입력하세요" value={age} onChangeText={setAge} keyboardType="numeric" />

          {/* 반려동물 타입 선택 */}
          <View className="w-full flex-row justify-around items-center mb-5 pt-5">
            <TouchableOpacity
              onPress={() => setPetType('강아지')}
              className="flex-row items-center"
            >
              <View className={`w-6 h-6 rounded-full border-2 border-skyblue justify-center items-center ${petType === '강아지' ? 'bg-blue' : ''}`}>
                {petType === '강아지' && <View className="w-3 h-3 rounded-full bg-white" />}
              </View>
              <View className='pl-5'>
                <StylizedText type='header2'>강아지</StylizedText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPetType('고양이')}
              className="flex-row items-center"
            >
              <View className={`w-6 h-6 rounded-full border-2 border-skyblue justify-center items-center ${petType === '고양이' ? 'bg-blue' : ''}`}>
                {petType === '고양이' && <View className="w-3 h-3 rounded-full bg-white" />}
              </View>
              <View className='pl-5'>
                <StylizedText type='header2'>고양이</StylizedText>
              </View>
            </TouchableOpacity>
          </View>

          {/* 성별 선택 */}
          <View className="w-full flex-row justify-around items-center mb-5 ">
            <TouchableOpacity
              onPress={() => setGender('암')}
              className="flex-row items-center -ml-6"
            >
              <View className={`w-6 h-6 rounded-full border-2 border-skyblue justify-center items-center ${gender === '암' ? 'bg-blue' : ''}`}>
                {gender === '암' && <View className="w-3 h-3 rounded-full bg-white" />}
              </View>
              <View className='pl-5'>
                <StylizedText type='header2'>암</StylizedText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setGender('수')}
              className="flex-row items-center mr-2"
            >
              <View className={`w-6 h-6 rounded-full border-2 border-skyblue justify-center items-center ${gender === '수' ? 'bg-blue' : ''}`}>
                {gender === '수' && <View className="w-3 h-3 rounded-full bg-white" />}
              </View>
              <View className='pl-5'>
                <StylizedText type='header2'>수</StylizedText>
              </View>
            </TouchableOpacity>
          </View>

          {/* 저장하기 버튼 */}
          <View className='pt-5'>
            <RoundedTextButton
              content={'저장하기'}
              textType='header2'
              widthOption="full"
              color="bg-primary"
              onPress={handleSubmit}
            />
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PetUpdate;
