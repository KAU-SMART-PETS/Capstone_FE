import React, { useEffect, useState } from 'react';
import { View, Alert, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import StylizedText, { HeaderText } from '@components/common/StylizedText';
import RoundedBox from '@common/RoundedBox';
import { RoundedTextButton } from '@components/common/RoundedButton';
import Avatar from '@components/common/Avatar';
import { fetchUserProfile } from '@api/userApi';

const CongratulatePopUp: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // point 값을 안전하게 가져오고 기본값 설정
  const { point = 0 } = route.params || {};

  // 유저 이름을 저장할 state
  const [userName, setUserName] = useState('똑똑');

  useEffect(() => {
    // 유저 이름을 가져오는 함수
    const fetchUserName = async () => {
      const userData = await fetchUserProfile();
      if (userData && userData.name) {
        setUserName(userData.name);
      } else {
        console.log('Failed to load user profile');
      }
    };

    fetchUserName();
  }, []);

  // PaymentInformation 페이지로 이동
  const handleNavigateToPayment = () => {
    navigation.navigate('PaymentInformation');
  };

  // 화면의 아무 부분을 눌렀을 때 닫기
  const handleClosePopup = () => {
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={handleClosePopup}>
      <View className="bg-white flex-1 px-5 py-10">
        {/* 헤더 부분 */}
        <HeaderText
          text={`${userName}님,\n7일 연속 산책하기 달성을 축하드려요!`}
          highlight={userName}
        />

        <StylizedText type="body1" styleClass="text-grey mb-6 mx-2">
          주소를 입력해주시면 샘플을 보내드려요. 포인트로 제품이나 샘플을 구매하실 수 있어요.
        </StylizedText>

        {/* 포인트 박스 */}
        <RoundedBox preset="A-yellow-20" shadow={false} isButton={false}>
          <View className="flex flex-row items-center justify-center p-4">
            <Avatar source={require('@image/icon/coin.png')} size={40} />
            <StylizedText type="header1" styleClass="text-black ml-2">
              {point} P
            </StylizedText>
          </View>
        </RoundedBox>

        {/* 주소 입력하기 버튼 */}
        <View className="flex-1 justify-end">
          <RoundedTextButton content="주소 입력하기" widthOption="full" onPress={handleNavigateToPayment} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CongratulatePopUp;
