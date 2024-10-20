// import React from 'react';
// import { View, Text } from 'react-native';
// import RoundedBox from './RoundedBox';

// type DiseaseInfoCardProps = {
//   diseaseName: string;
//   probability: number;
//   additionalText?: string; // Optional additional text
//   badgeText: string; // For danger, normal, safe badges
//   badgeColor: string; // Background color for badge
// };

// const DiseaseInfoCard: React.FC<DiseaseInfoCardProps> = ({
//   diseaseName,
//   probability,
//   additionalText,
//   badgeText,
//   badgeColor,
// }) => {
//   return (
//     <RoundedBox>
//       <View className={`absolute top-2 right-2 px-2 py-1 rounded-lg ${badgeColor}`}>
//         <Text className="text-white font-bold text-sm">{badgeText}</Text>
//       </View>
//       <Text className="text-2xl font-bold">{diseaseName}</Text>
//       {additionalText && <Text className="text-gray-600 mt-1">{additionalText}</Text>}
//       <View className="flex-row justify-between items-center mt-3">
//         <Text className="text-gray-500">Percentage</Text>
//         <Text className="text-3xl font-bold text-black">{probability}%</Text>
//       </View>
//     </RoundedBox>
//   );
// };

// export default DiseaseInfoCard;
