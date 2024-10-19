import React from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RoundedBox from '@components/common/RoundedBox';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const petData = {
  name: "하루",
  type: "믹스",
  age: "4 살",
  sex: "암컷",
  diseases: [
    { name: "습진", probability: 83 },
    { name: "진드기", probability: 60 },
    { name: "알레르기", probability: 10 },
  ],
};

const Example = () => {
  const navigation = useNavigation(); 

  const handleCardPress = (disease) => {
    navigation.navigate('DiseaseDetail', { disease });
  };

  return (
    <View className="flex-1 bg-[#F7F7F7] pt-10 px-5">
      <ScrollView className="pb-20">
        <Text className="text-3xl font-bold text-center text-black mb-4">
          <Text className="text-sky-500">{petData.name}</Text> 의 분석 리포트
        </Text>
        <Image source={{ uri: 'https://via.placeholder.com/80' }} className="w-30 h-30 rounded-full mx-auto mb-4" />
        
        <Text className="text-left font-bold text-xl mb-4">의심질환</Text>
        <View className="flex flex-wrap flex-row justify-between">
          {petData.diseases.map((disease, index) => (
            <RoundedBox
              key={index}
              title={disease.name}
              description="치료가 필요해요."
              icon={<MaterialCommunityIcons name="plus" size={20} color="red" />}
              percentage={disease.probability}
              badgeText={disease.probability > 80 ? "위험" : disease.probability > 59 ? "보통" : "안전"}
              onPress={() => handleCardPress(disease)}
            />
          ))}
        </View>

        <Text className="font-bold text-lg text-gray-600 mt-5">주의사항</Text>
        <Text className="text-gray-600">
          해당 리포트는 참고용 자료이며 정확한 진단은 인근 동물병원에서 해주세요.
        </Text>
      </ScrollView>
    </View>
  );
};

export default Example;
