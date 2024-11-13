import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { deletePet } from '@src/api/petApi';
import StylizedText from '@src/components/common/StylizedText';
import Avatar from '@src/components/common/Avatar';
import AvatarPlaceholder from '@image/placeholder/dog.jpg';
import { RoundedTextButton } from '@src/components/common/RoundedButton';
import redirectIfNoSession from '@src/redirectionIfNoSession';

// TODO: 일일 산책 박스 필요
// TODO: 반려동물 상세정보에서 text box 필요

const mockData = {
  steps: {
    current: 1900,
    goal: 3000
  },
  minutes: {
    current: 18,
    goal: 60
  },
  petDetails: {
    name: "하늘이",
    type: "강아지",
    weight: "25",
    age: "3",
    gender: "암",
  },
  estimatedCalories: 330
};

const PetProfile: React.FC<{ route: RouteProp<RootStackParamList, 'PetProfile'> }> = ({ route }) => {
  redirectIfNoSession();
  const pet = route.params?.pet;
  const {
    id = 0,
    name = '이름 없음',
    petType = '종류 없음',
    gender = '성별 없음',
    weight = '무게 없음',
    imageUrl = '',
    age = '나이 없음',
  } = pet || {}; // pet이 undefined일 경우 빈 객체로 대체

  const navigation = useNavigation();
  const [showDetail, setShowDetail] = useState(false);

  const handleBackButton = () => {
    navigation.goBack();
  };

  const calculatePercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const stepsPercentage = calculatePercentage(mockData.steps.current, mockData.steps.goal);
  const minutesPercentage = calculatePercentage(mockData.minutes.current, mockData.minutes.goal);

  const toggleDetail = () => {
    setShowDetail(prevState => !prevState);
  };

  const getLabel = (key: string) => {
    const labels: { [key: string]: string } = {
      name: '이름',
      petType: '종류',
      weight: '체중',
      age: '나이',
      gender: '성별',
    };

    return labels[key] || key;
  };

  const handleHealthInfo = () => {
    navigation.navigate("RegisterHealthInfo", { id: pet.id });
  };

  const handlePetDelete = async() => {
    const isDeleted = await deletePet(pet.id);
    if(isDeleted){
      navigation.navigate("MyPage")
    }else{
      Alert.alert("삭제 실패")
    }
  }

  const handlePetUpdate = () => {
    navigation.navigate('PetUpdate', { petId: pet.id });
  };


  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* 상단 버튼들 */}
        

        <View className="flex-1 px-5 bg-white items-center">
          {/* 뒤로가기 버튼 */}
          <TouchableOpacity onPress={handleBackButton} className="self-start mt-5">
            <Text className="text-gray-500 text-2xl">{'<'}</Text>
          </TouchableOpacity>

          {/* 프로필 섹션 */}
          <View className="items-center mt-5 mb-5 w-full">
            <Avatar
              source={imageUrl ? {uri: imageUrl} : AvatarPlaceholder}
              size={150}
            />
            <View className='pt-4'>
              <StylizedText type='header1'>{name}</StylizedText>
            </View>


            
          </View>
          <View className="w-full items-start mt-2">
            <View className="mt-1 pl-5 pt-5">
              <StylizedText type="header2">예상 칼로리 소모량</StylizedText>
              <StylizedText type="body1">{mockData.estimatedCalories} kcal</StylizedText>
            </View>
          </View>

          {/* 일일 산책 카드 */}
          <View className="w-full bg-silver rounded-xl p-5 mt-5 shadow">
            <View className='pb-5'>
              <StylizedText type='header1'>일일 산책</StylizedText >
            </View>

            {/* 걸음 수 */}
            <View className="mb-5">
              <View className="flex-row justify-between mb-2">
                <StylizedText type='header2'>걸음 수 </StylizedText>
                <StylizedText type='header2'>
                  {mockData.steps.current} / {mockData.steps.goal}
                </StylizedText>
              </View>
              <View className="h-7 bg-skyblue rounded-full overflow-hidden p-1">
                <View
                  className="h-full bg-blue rounded-full"
                  style={{ width: `${stepsPercentage}%` }}
                />
              </View>
            </View>

            {/* 시간 */}
            <View className="mb-5">
              <View className="flex-row justify-between mb-2">
                <StylizedText type='header2'>시간</StylizedText>
                <StylizedText type='header2'>
                  {mockData.minutes.current} / {mockData.minutes.goal} 분
                </StylizedText>
              </View>
              <View className="h-7 bg-skyblue rounded-full overflow-hidden p-1">
                <View
                  className="h-full bg-blue rounded-full"
                  style={{ width: `${minutesPercentage}%` }}
                />
              </View>
            </View>
          </View>

          {/* 상세 정보 */}
    
          {showDetail && (
            <>
              <View className="w-full bg-white rounded-xl p-5 mt-5 border border-gray-300 flex-row justify-between items-center">
               <StylizedText type='header2'>{getLabel('petType')}</StylizedText>
               <StylizedText type='header2'>{petType}</StylizedText>
              </View>

              <View className="w-full bg-white rounded-xl p-5 mt-5 border border-gray-300 flex-row justify-between items-center">
                <StylizedText type='header2'>{getLabel('gender')}</StylizedText>
                <StylizedText type='header2'>{gender}</StylizedText>
              </View>

              <View className="w-full bg-white rounded-xl p-5 mt-5 border border-gray-300 flex-row justify-between items-center">
                <StylizedText type='header2'>{getLabel('weight')}</StylizedText>
                <StylizedText type='header2'>{weight} kg</StylizedText>
              </View>

              <View className="w-full bg-white rounded-xl p-5 mt-5 border border-gray-300 flex-row justify-between items-center">
                <StylizedText type='header2'>{getLabel('age')}</StylizedText>
                <StylizedText type='header2'>{age} 세</StylizedText>
              </View>

              <View className="justify-around p-4">
                <View className='pt-5'>
                  <RoundedTextButton
                    content={"보건정보 조회하기"}
                    textType='header2'
                    widthOption="full"
                    color="bg-primary"
                    onPress={handleHealthInfo}
                  />
                </View>

                <View className='pt-5'>
                  <RoundedTextButton
                    content={"반려동물 삭제하기"}
                    textType='header2'
                    widthOption="full"
                    color="bg-primary"
                    onPress={handlePetDelete}
                  />
                </View>

                <View className='pt-5'>
                  <RoundedTextButton
                    content={"반려동물 수정하기"}
                    textType='header2'
                    widthOption="full"
                    color="bg-primary"
                    onPress={handlePetUpdate}
                  />
              </View>
            </View>
            </>
          )}

          {/* 정보 토글 버튼 */}
          <View className='pt-5'>
            <RoundedTextButton
              content={showDetail ? '정보 숨기기' : '정보 펼쳐보기'}
              textType='header2'
              widthOption="full"
              color="bg-primary"
              onPress={toggleDetail}
            />
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


export default PetProfile;
