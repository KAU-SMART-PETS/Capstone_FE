import React, { useEffect, useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StylizedText, { HeaderText } from '@components/common/StylizedText';
import RoundedBox from '@common/RoundedBox';
import Avatar from '@components/common/Avatar';
import { PillBadge } from '@components/common/Badge';
import { rewardsList, depositRewardPoints } from '@api/rewardApi';
import { depositPoints } from '@api/pointApi';
import { fetchUserProfile } from '@api/userApi';
import { RoundedTextButton } from '@components/common/RoundedButton';

const ChallengeList: React.FC = () => {
  const navigation = useNavigation();
  const [rewardsData, setRewardsData] = useState([]);
  const [userName, setUserName] = useState<string>(''); // 기본값 빈 문자열
  const [userData, setUserData] = useState(null); // 사용자 데이터를 저장할 상태

  // 사용자 데이터와 리워드 목록을 로드
  const fetchData = async () => {
    const userProfile = await fetchUserProfile();
    if (userProfile) {
      setUserName(userProfile.name || ''); // 이름이 없을 때 빈 문자열로 처리
      setUserData(userProfile);
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

  // 리워드 정렬
  const sortedRewards = rewardsData.sort((a, b) => {
    if (a.isAchieved && !a.isObtain) return -1;
    if (!a.isAchieved) return 1;
    if (a.isAchieved && a.isObtain) return 2;
    return 0;
  });

  // 리워드 선택 시 포인트 적립
  const handleRewardPress = async (reward) => {
    if (reward.isAchieved && !reward.isObtain) {
      const result = await depositRewardPoints(reward.id);
      if (result) {
        navigation.navigate('CongratulatePopUp', { point: reward.earnPoint });
        fetchData(); // 리워드 목록 업데이트
      } else {
        Alert.alert('적립 실패', '포인트 적립에 실패했습니다. 다시 시도해 주세요.');
      }
    } else {
      console.log(`Reward ID ${reward.id} is not eligible for deposit`);
    }
  };

  // 테스트용 포인트 적립 버튼 핸들러
  const handleTestDeposit = async () => {
    const isSuccess = await depositPoints(50000);
    if (isSuccess) {
      Alert.alert('포인트 적립 완료', '5만 포인트가 적립되었습니다.');
    } else {
      Alert.alert('적립 실패', '포인트 적립에 실패했습니다.');
    }
  };

  return (
    <>
      <ScrollView className="flex-1 bg-white pt-10 px-5">
        <HeaderText
          text={`${userName || '사용자'}님,\n달성한 리워드를 확인해 주세요.`}
          highlight={userName || '사용자'}
        />
        <View className="space-y-4 mt-4">
          {sortedRewards.map((reward) => {
            let statusText = "미달성";
            if (reward.isAchieved && reward.isObtain) {
              statusText = "수령 완료";
            } else if (reward.isAchieved) {
              statusText = "달성";
            }
            //TODO : minimal_env에 업데이트 된 컴포넌트 사용 
            return (
              <View key={reward.id} className="w-[90%] flex justify-center">
                <RoundedBox
                  preset="A"
                  isButton={true}
                  shadow={true}
                  onPress={() => handleRewardPress(reward)}
                >
                  <View className="flex-row items-center pl-4 pr-4">
                    <Avatar size={40} />
                    <View className="flex flex-1 ml-5">
                      <View className="flex flex-row items-center mb-2">
                        <StylizedText type="header2" styleClass="text-black">
                          {reward.title}
                        </StylizedText>
                        <View className="ml-auto">
                          <PillBadge
                            text={statusText}
                            color={
                              statusText === "달성"
                                ? "bg-primary"
                                : statusText === "수령 완료"
                                ? "bg-darkgreen"
                                : "bg-silver"
                            }
                            textColor="text-white"
                          />
                        </View>
                      </View>
                      <StylizedText type="body2" styleClass="text-darkgrey">
                        {reward.content}
                      </StylizedText>
                    </View>
                  </View>
                </RoundedBox>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* 테스트용 포인트 적립 버튼 */}
      <View className="absolute bottom-0 w-full p-4">
        <RoundedTextButton
          content="테스트용 무한 포인트 적립 버튼"
          widthOption="full"
          onPress={handleTestDeposit}
        />
      </View>
    </>
  );
};

export default ChallengeList;
