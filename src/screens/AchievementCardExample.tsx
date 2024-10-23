import React from 'react';
import { View } from 'react-native';
import { RootStackParamList } from '@types';
import RoundedBox from '@components/common/RoundedBox';
import { PillBadge } from '@components/common/Badge';
import Avatar from '@components/common/Avatar';
import StylizedText from '@components/common/StylizedText';

const AchievementCardExample: React.FC<RootStackParamList> = () => {

  return (
    <View className="self-start">
    <RoundedBox
      preset="A"
      isButton={false}
      shadow={true}
      borderActivate={false}
    >
      <View className="flex-row items-center">
        <View>
          <Avatar 
            size={40}
          />
        </View>

        <View className="flex ml-5">
          <View className="flex-row justify-between items-center mb-2">
            <StylizedText 
              type="header2"
              color="text-gray-900"
            >
              7일 연속 산책하기
            </StylizedText>
            <PillBadge
              text="달성"
              color="bg-primary"
              textColor="text-white"
            />
          </View>
          <StylizedText 
            type="body2"
            color="text-gray-500"
          >
            7일 연속 30분 이상 산책에 성공해보세요!
          </StylizedText>
        </View>
      </View>
    </RoundedBox>
    </View>
  );
}

export default AchievementCardExample;