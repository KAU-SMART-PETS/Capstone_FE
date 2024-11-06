// TextForm.tsx
import React from 'react';
import { View } from 'react-native';

import Avatar from '@components/common/Avatar';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import StylizedText from '@common/StylizedText';

interface WalkingRecordProps {
  walkDate: string;
  walkTime: string;
  distance: string;
  calories: string;
  steps: string;
}

export const WalkingRecord: React.FC<WalkingRecordProps> = ({ walkDate, walkTime, distance, calories, steps }) => {
  return (
    <View className="bg-white flex-1 px-3 my-2">
      {/* Header 부분 */}
      <View className="flex-row justify-between items-center mb-2">
        <StylizedText type="header1" styleClass="text-black">
          오늘의 산책 기록
        </StylizedText>
        {/* 강아지 사진 */}
        <Avatar size={50} />
      </View>

      {/* 텍스트 */}
      <View className="flex-row justify-start">
        {/* 왼쪽 박스 (고정 텍스트) */}
        <View className="flex flex-col space-y-2 mr-10">
          <View>
            <StylizedText type="body1" styleClass="text-black">산책 일시</StylizedText>
          </View>
          <View>
            <StylizedText type="body1" styleClass="text-black">산책 시간</StylizedText>
          </View>
          <View>
            <StylizedText type="body1" styleClass="text-black">이동 거리</StylizedText>
          </View>
          <View>
            <StylizedText type="body1" styleClass="text-black">소모 칼로리</StylizedText>
          </View>
          <View>
            <StylizedText type="body1" styleClass="text-black">걸음 수</StylizedText>
          </View>
        </View>

        {/* 오른쪽 박스 (변동 텍스트) */}
        <View className="flex-col justify-between">
          <StylizedText type="body1" styleClass="text-black">
            {walkDate}
          </StylizedText>
          <StylizedText type="body1" styleClass="text-black">
            {walkTime}
          </StylizedText>
          <StylizedText type="body1" styleClass="text-black">
            {distance}
          </StylizedText>
          <StylizedText type="body1" styleClass="text-black">
            {calories}
          </StylizedText>
          <StylizedText type="body1" styleClass="text-black">
            {steps}
          </StylizedText>
        </View>
      </View>
              {/* Footer 텍스트 */}
              <View className="mt-2 justify-center">
          <StylizedText type="body2" styleClass="text-darkgrey">
            소모 칼로리와 걸음 수를 측정하기 위해서는 디바이스가 필요해요!
          </StylizedText>
        </View>
      </View>
  );
};

// Warning 컴포넌트 정의
export const Warning: React.FC = () => {
    return (
      <View className="my-2">
        <View className="flex-row">
          {/* 아이콘 */}
          <MCIcon name="alert-circle-outline" size={20} styleClass="#A0A0A0" style={{ marginTop: 2 }} />
          
          {/* 텍스트 */}
          <View className="ml-2">
            <StylizedText type="header2" styleClass="text-darkgrey">
              주의 사항
            </StylizedText>
          </View>
        </View>
        <StylizedText type="body2" styleClass="text-darkgrey">
          해당 리포트는 참고용 자료이며{"\n"}정확한 진단은 인근 동물병원에서 해주세요.
        </StylizedText>
      </View>
    );
  };

  export default WalkingRecord;