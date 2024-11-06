import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Disease, DiseaseDetails, PetData } from '@types';
import RoundedBox from '@components/common/RoundedBox'; // RoundedBox 컴포넌트 import
import AvatarPlaceholder from '@image/placeholder/dog.jpg';


// {/* Title (First Row) */}
// <View className="mb-2"> {/* Margin Bottom for Spacing */}
// <StylizedText type="header2">{title}</StylizedText>
// </View>

// {/* Body (Second Row) */}
// <View>
// {/* Description */}
// {description && (
//   <Text className="text-gray-500 mt-1 text-xs">{description}</Text>
// )}

// {/* Percentage (if applicable) */}
// {percentage !== undefined && (
//   <View className="flex-row justify-between items-center mt-1">
//     <Text className="font-normal text-[8px]">Percentage</Text>
//     <View className="flex flex-row items-end ml-2">
//       <Text className="text-3xl font-bold text-gray-800">{percentage}</Text>
//       <Text className="text-sm mb-1 ml-1">%</Text>
//     </View>
//   </View>
// )}
// </View>
const petData: PetData = {
  name: "하루",
  type: "믹스",
  age: "4 살",
  sex: "암컷",
  diseases: [
    { name: "습진", probability: 83 },
    { name: "진드기", probability: 60 },
    { name: "알레르기", probability: 10 }
  ]
};

const diseaseDetails: Record<string, DiseaseDetails> = {
  "습진": {
    about: "습진은 피부가 염증에 의해 붉고 가려운 상태입니다.",
    note: "주의 깊게 관찰하고 악화시 병원에 방문하세요.",
    goodFood: "생선, 오메가-3",
    badFood: "짠 음식"
  },
  "진드기": {
    about: "진드기는 피부에 기생하는 작은 해충입니다.",
    note: "정기적인 목욕과 청결 관리가 필요합니다.",
    goodFood: "고단백 사료",
    badFood: "단 음식"
  },
  "알레르기": {
    about: "알레르기는 다양한 원인으로 피부가 가려울 수 있습니다.",
    note: "원인을 파악하고 피하는 것이 중요합니다.",
    goodFood: "알레르기 저항성 사료",
    badFood: "인공 첨가물 포함 음식"
  }
};

const Analysis: React.FC = () => {
  const navigation = useNavigation(); 

  const getProbabilityColor = (probability: number): string => {
    if (probability > 80) {
      return '#FF6B6B'; 
    } else if (probability >= 60) {
      return '#FFD700'; 
    } else {
      return '#32CD32';
    }
  };

  const handleCardPress = (disease: Disease): void => {
    const diseaseDetail = diseaseDetails[disease.name] || {};
    navigation.navigate('DiseaseDetail', { disease, petName: petData.name, diseaseDetail });
  };

  const handleFindHospital = () => {
    navigation.navigate('HospitalList');
  };

  return (
    <View className="flex-1 bg-[#F7F7F7] pt-30">
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 100 }}>
        <Text className="text-2xl font-bold">
          <Text className="text-sky-500">{petData.name}</Text> 의 분석 리포트
        </Text>
        <View className="w-20 h-20 rounded-full overflow-hidden">
          <Image source={AvatarPlaceholder} className="w-20 h-20"/>
        </View>
        <View className="flex-row mb-4 justify-center flex-wrap">
          <View className="bg-[#D9D9D9] rounded-20 py-2 px-4 mx-2 mb-2">
            <Text className="font-bold text-lg text-[#A3A3AC]">{petData.type}</Text>
          </View>
          <View className="bg-[#D9D9D9] rounded-20 py-2 px-4 mx-2 mb-2">
            <Text className="font-bold text-lg text-[#A3A3AC]">{petData.age}</Text>
          </View>
          <View className="bg-[#D9D9D9] rounded-20 py-2 px-4 mx-2 mb-2">
            <Text className="font-bold text-lg text-[#A3A3AC]">{petData.sex}</Text>
          </View>
        </View>

        <View className="w-full h-0.5 bg-[#D1D1D6] my-4" />
        <Text className="text-xl font-bold text-black py-2">의심질환</Text>

        <View className="w-full flex-row flex-wrap justify-around">
          {petData.diseases.map((disease, index) => (
            <RoundedBox
              key={index}
              title={disease.name}
              percentage={disease.probability}
              badgeText={`${disease.probability}%`}
              onPress={() => handleCardPress(disease)}
              shadow={true}
              preset="B" // Optional preset for styling
            />
          ))}
        </View>

        <Text className="text-lg font-bold text-[#A3A3AC] mt-6">주의사항</Text>
        <Text className="text-base text-[#A3A3AC] text-left">
          해당 리포트는 참고용 자료이며 정확한 진단은 인근 동물병원에서 해주세요.
        </Text>

        <View className="h-20" />
      </ScrollView>

      <View className="absolute bottom-5 left-0 right-0 px-5">
        <TouchableOpacity onPress={handleFindHospital} className="bg-skyblue rounded-full py-4">
          <Text className="font-bold text-white text-lg text-center">병원 찾기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Analysis;
