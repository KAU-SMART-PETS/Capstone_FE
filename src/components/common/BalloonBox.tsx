import React from 'react';
import { View } from 'react-native';
// BalloonBox.tsx

type BalloonBoxProps = {
  children: React.ReactNode;
};

const BalloonBox: React.FC<BalloonBoxProps> = ({
  children,
  }) => {
  return (
  <View
      className={`bg-skyblue mt-4 mb-5 px-10 py-10 rounded-2xl relative`}
    >
      {/* 말풍선 삼각형 (테일윈드문으로 생성 불가)*/}
      <View
        style={{
          position: 'absolute',
          top: -10,
          left: 20,
          width: 0,
          height: 0,
          borderLeftWidth: 10,
          borderRightWidth: 10,
          borderBottomWidth: 10,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: '#D7E8EE', // 말풍선과 동일한 색
        }}
      />
      {/* 내용. 내용간 간격 조절 */}
      <View className="flex space-y-10">{children}</View>
    </View>

  );

};

export default BalloonBox;