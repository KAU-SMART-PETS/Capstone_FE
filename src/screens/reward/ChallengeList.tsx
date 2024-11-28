import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ModalLayout from '@components/ModalLayout'; // ModalLayout import
import StylizedText, { HeaderText } from '@components/common/StylizedText';
import { RewardCard } from '@components/FlatListCards';
import { rewardsList, depositRewardPoints } from '@api/rewardApi';
import { depositPoints } from '@api/pointApi';
import { fetchUserProfile } from '@api/userApi';
import { RoundedTextButton } from '@components/common/RoundedButton';

const ChallengeList: React.FC = () => {
  const navigation = useNavigation();
  const [rewardsData, setRewardsData] = useState([]);
  const [userName, setUserName] = useState<string>(''); // 기본값 빈 문자열

  // Modal 상태
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // 사용자 데이터와 리워드 목록을 로드
  const fetchData = async () => {
    const userProfile = await fetchUserProfile();
    if (userProfile) {
      setUserName(userProfile.name || ''); // 이름이 없을 때 빈 문자열로 처리
    } else {
      console.log('Failed to load user profile');
    }

    const data = await rewardsList();
    if (data) {
      setRewardsData(data.rewards || []);
    } else {
      console.log('Failed to load rewards');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  //NOTE : 리워드 정렬 순서 적용이 잘 안되어 현재 주석 처리.
  // 리워드 정렬. 보상을 받을 수 있는 리워드가 최상위
  /*
  const sortedRewards = rewardsData.sort((a, b) => {
    if (a.isAchieved && !a.isObtain) return -1;
    if (!a.isAchieved) return 1;
    if (a.isAchieved && a.isObtain) return 2;
    return 0;
  });
  */

  // 리워드 선택 시 포인트 적립
  const handleRewardPress = async (reward) => {
    if (reward.isAchieved && !reward.isObtain) {
      const result = await depositRewardPoints(reward.id);
      if (result) {
        console.log(`Navigating to CongratulatePopUp with rewardId: ${reward.id}`);
        navigation.navigate('CongratulatePopUp', { rewardId: reward.id });
        fetchData(); // 리워드 목록 업데이트
      } else {
        setModalMessage('포인트 적립에 실패했습니다. 다시 시도해 주세요.');
        setModalVisible(true);
      }
    } else {
      console.log(`Reward ID ${reward.id} is not eligible for deposit`);
    }
  };

  // 테스트용 포인트 적립 버튼 핸들러
  const handleTestDeposit = async () => {
    const isSuccess = await depositPoints(50000);
    if (isSuccess) {
      setModalMessage('5만 포인트가 적립되었습니다.');
      setModalVisible(true);
    } else {
      setModalMessage('포인트 적립에 실패했습니다.');
      setModalVisible(true);
    }
  };

  return (
    <>
      <ScrollView className="flex-1 bg-white pt-10 px-5" contentContainerStyle={{ paddingBottom: 100}}>
        <HeaderText
          text={`${userName || '사용자'}님,\n달성한 리워드를 확인해 주세요.`}
          highlight={userName || '사용자'}
        />
        <View className="flex-1 items-center">
          <RoundedTextButton
            content="테스트용 무한 포인트 적립 버튼"
            widthOption="xl"
            onPress={handleTestDeposit}
          />
        </View>
        <View className="space-y-4 mt-4">
          {/*
          sortedRewards.map((reward) => {
          */}
          {rewardsData.map((reward) => {
            const statusText = reward.isAchieved
              ? reward.isObtain
                ? '수령 완료'
                : '달성'
              : '미달성';

            return (
              <RewardCard
                key={reward.id}
                title={reward.title}
                content={reward.content}
                status={statusText}
                avatarSource={reward.earnPoint.toString()} // 포인트를 avatarSource로 표시
                onPress={() => handleRewardPress(reward)}
              />
            );
          })}
        </View>
      </ScrollView>

      {/* Modal */}
      <ModalLayout
        visible={modalVisible}
        setVisible={setModalVisible}
        title={modalMessage}
        rows={[{ content: [<RoundedTextButton content="확인" onPress={() => setModalVisible(false)} />] }]}
      />
    </>
  );
};

export default ChallengeList;
