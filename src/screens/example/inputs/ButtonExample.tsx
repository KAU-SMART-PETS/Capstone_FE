import React from 'react';
import { View, Text } from 'react-native';

// TODO : 버튼의 크기-색상-별로 나눠서 에제 만들 것임

// const ButtonSolid: React.FC = () => {
//    return (
//    <View className="flex-col bg-white">
//       <BannerSection
//       row1="오늘도 즐겁게"
//       row2="산책을 시작해볼까요?"
//       sideImg={WalkingdogIcon}
//       onPress={() => console.log("Solid Banner Clicked")}
//       />
//     </View>
//    );
// };

const ButtonExample: React.FC<RootStackParamList> = () => {
    
  return (
    <View className="p-2"> 
        <Text>123</Text>
    </View>
  );
}

export default ButtonExample;