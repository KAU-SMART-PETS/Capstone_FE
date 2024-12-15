import React, { useEffect, useState } from 'react';
import { View, Alert, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import StylizedText, { HeaderText } from '@common/StylizedText';
import RoundedBox from '@common/RoundedBox';
import { RoundedTextButton } from '@common/RoundedButton';
import Avatar from '@common/Avatar';
import { fetchUserProfile } from '@api/userApi';
import { rewardsList } from '@api/rewardApi';

const CongratulatePopUp: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // rewardId 값을 안전하게 가져오고 기본값 설정
  const { rewardId = null } = route.params || {};

  // State
  const [userName, setUserName] = useState('똑똑'); // 기본 사용자 이름
  const [rewardTitle, setRewardTitle] = useState('리워드'); // 기본 리워드 제목
  const [rewardPoints, setRewardPoints] = useState(0); // 기본 리워드 포인트

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

// 리워드 데이터를 가져오는 함수
    const fetchRewardData = async () => {
      if (rewardId) {
        //console.log(`Fetching reward data for rewardId: ${rewardId}`);
        const rewardsData = await rewardsList();
        if (rewardsData && rewardsData.rewards) {
          //console.log('Reward API response:', rewardsData);
          const reward = rewardsData.rewards.find((r) => r.id === rewardId);
          if (reward) {
            //console.log(`Reward found: Title - ${reward.title}, Points - ${reward.earnPoint}`);
            setRewardTitle(reward.title); // 제목 설정
            setRewardPoints(reward.earnPoint); // 포인트 설정
          } else {
            console.log(`Reward with ID ${rewardId} not found`);
          }
        } else {
          console.log('Failed to load rewards data');
        }
      }
    };


    fetchUserName();
    fetchRewardData();
  }, [rewardId]);

  // PaymentInformation 페이지로 이동
  const handleNavigateToPayment = () => {
    navigation.navigate('PaymentSampleInformation');
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
          text={`${userName}님,\n${rewardTitle} 달성을 축하드려요!`} // rewardTitle을 출력
          highlight={userName}
        />

        <StylizedText type="body1" styleClass="text-grey mb-6 mx-2">
          주소를 입력해주시면 샘플을 보내드려요. 포인트로 제품이나 샘플을 구매하실 수 있어요.
        </StylizedText>

        {/* 포인트 박스 */}
        <RoundedBox preset="A-yellow-20" shadow={false}>
          <View className="flex flex-row items-center justify-center p-4">
            <Avatar source={require('@image/icon/coin.png')} size={40} />
            <StylizedText type="header1" styleClass="text-black ml-2">
              {rewardPoints} P
            </StylizedText>
          </View>
        </RoundedBox>

        {/* 주소 입력하기 버튼 */}
        <View className="flex-1 justify-end items-center">
          <RoundedTextButton content="주소 입력하기" widthOption="xl" onPress={handleNavigateToPayment} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CongratulatePopUp;
