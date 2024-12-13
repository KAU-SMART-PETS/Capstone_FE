import React from 'react';
import { View } from 'react-native';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import FeatherIcon from 'react-native-vector-icons/Feather';
import RoundedBox from '@common/RoundedBox';
import StylizedText from '@common/StylizedText';

interface WalkRecordingPanelProps {
  distanceInMeters: number; // 거리 (미터)
  timeInSeconds: number;    // 시간 (초)
}

// 시간을 HH:MM:SS 형식으로 변환하는 함수
const formatTime = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return [hrs, mins, secs]
    .map((val) => (val < 10 ? `0${val}` : val)) // 2자리로 맞춤
    .join(':');
};

// 거리를 km로 변환하는 함수
const formatDistance = (meters: number): string => {
  return (meters / 1000).toFixed(2); // km 단위로 변환 후 소수점 1자리까지 표시
};

const WalkRecordingPanel: React.FC<WalkRecordingPanelProps> = ({ distanceInMeters, timeInSeconds }) => {
  const formattedDistance = formatDistance(distanceInMeters);
  const formattedTime = formatTime(timeInSeconds);

  return (
    <View className="absolute top-5 left-5 right-5 z-10 flex-1 items-center justify-center">
      <RoundedBox preset="opaque-panel" shadow={false} className="w-[85%]">
        <View className="flex-row items-center">
          <FeatherIcon name="compass" size={20} color="black" />
          <StylizedText type="header2" styleClass="ml-3 text-black">{formattedDistance} km</StylizedText>
        </View>
        <View className="flex-row items-center">
          <FontistoIcon name="stopwatch" size={20} color="black" />
          <StylizedText type="header2" styleClass="ml-3 text-black">{formattedTime}</StylizedText>
        </View>
      </RoundedBox>
    </View>
  );
};

export default WalkRecordingPanel;
