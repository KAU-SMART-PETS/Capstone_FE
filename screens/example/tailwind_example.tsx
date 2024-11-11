// import React from 'react';
// import { View, Text, Image, Pressable } from 'react-native';

// const TailwindExample = () => {
//   return (
//     <View className="flex-1 justify-center items-center bg-gradient-to-b from-blue-400 to-blue-700">
//       <View className="p-4 bg-white rounded-lg shadow-lg w-80">
//         <Image
//           source={{ uri: 'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg' }}
//           className="w-20 h-20 rounded-full mx-auto mb-4"
//         />
//         <Text className="text-2xl font-semibold text-center text-gray-800">
//           Welcome to Tailwind
//         </Text>
//         <Text className="text-sm text-center text-gray-500 my-2">
//           A beautiful UI with React Native and Tailwind CSS
//         </Text>
//         <Pressable className="mt-4 p-2 bg-blue-500 rounded-lg shadow-md opacity-90 active:opacity-70">
//           <Text className="text-center text-white text-lg font-bold">Get Started</Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// };

// export default TailwindExample;


import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const TailwindExample = () => {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      {/* 상단 텍스트 */}
      <Text className="text-xl font-bold text-black mb-2">
        <Text className="text-blue-500">똑똑님</Text> 달성한 리워드를 확인해주세요.
      </Text>

      {/* 리워드 카드 목록 */}
      {[...Array(4)].map((_, index) => (
        <View
          key={index}
          className="flex-row items-center bg-white shadow-lg p-4 my-2 rounded-2xl border border-gray-200"
        >
          {/* 아이콘 */}
          <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mr-4">
            <FontAwesome name="paw" size={24} color="#1E90FF" />
          </View>

          {/* 텍스트 섹션 */}
          <View className="flex-1">
            <Text className="text-lg font-bold text-black">
              7일 연속 산책하기
            </Text>
            <Text className="text-sm text-gray-500">
              7일 연속 30분 이상 산책에 성공해보세요!
            </Text>
          </View>

          {/* 달성 여부 태그 */}
          <View className="bg-gray-100 px-3 py-1 rounded-full">
            <Text className="text-sm font-bold text-gray-400">
              {index === 0 ? '달성' : '미달성'}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default TailwindExample;
