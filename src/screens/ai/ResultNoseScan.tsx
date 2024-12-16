import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { HeaderText } from '@common/StylizedText';
import { RoundedTextButton } from '@common/RoundedButton';
import CustomAlert from '@common/CustomAlert';

const ResultNoseScan: React.FC<{ route: RouteProp<RootStackParamList, 'ResultNoseScan'> }> = ({ route }) => {
  const navigation = useNavigation();
  const { petDetails, isOwner } = route.params || {};

  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleViewDetails = () => {
    if (isOwner) {
      navigation.navigate('ResultOwnerDetails', {
        petName: petDetails.name, // 반려동물 이름 전달
        petDetails: petDetails,   // 반려동물 세부 정보 전달
      });
    } else {
      setAlertMessage('본인의 반려동물이 아니어서\n주인 정보를 확인할 수 없습니다.\n본 서비스는 유료로 제공됩니다.');
      setAlertVisible(true);
    }
  };
  console.log("이미지: ", petDetails?.imageUrl);
  return (
    <View className="flex-1 bg-white px-6 py-16">
      {/* Header Section */}
      <HeaderText
        highlight={petDetails?.name}
        text={`비문 조회 결과입니다.\n조회된 반려동물이 ${petDetails?.name} 맞나요?`}
      />
      {/* Pet Image Section */}
      <View className="flex-1 justify-center items-center my-8">
        {petDetails?.imageUrl ? (
          <Image source={{ uri: petDetails.imageUrl  }} className="w-52 h-52 rounded-full" />
        ) : (
          <Image source={require('@image/icon/example_cat.png')} className="w-52 h-52 rounded-full" />
        )}
      </View>
      {/* Bottom Button Section */}
      <View className="absolute bottom-6 left-4 right-4 items-center">
        <RoundedTextButton
          content={isOwner ? '내 반려동물 상세보기' : '해당 동물 상세보기'}
          widthOption="xl"
          onPress={handleViewDetails}
        />
      </View>

      {/* Alert Section */}
      <CustomAlert
        visible={isAlertVisible}
        message={alertMessage}
        onClose={() => {
          setAlertVisible(false); // 알림창 닫기
          navigation.navigate('MainTab' as never); // 홈 화면으로 돌아가기
        }}
      />
    </View>
  );
};

export default ResultNoseScan;
