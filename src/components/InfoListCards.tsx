import React from 'react';
import { View, Image } from 'react-native';
import { RoundedBox } from '@common/RoundedBox';
import Avatar from '@common/Avatar';
import StylizedText from '@common/StylizedText';
import ListCard from '@common/ListCard';

import phone from '@image/icon/phone.png';
import location from '@image/icon/location.png';

interface HospitalInfoCardProps {
    name: string;
    address: string;
    telephone: string;
  }

// 병원 정보를 표시하는 Card 컴포넌트
export const HospitalInfoCard: React.FC<HospitalInfoCardProps> = ({ name, address, telephone }) => (
    <ListCard
        title="병원 정보"
        items={[
        { icon: phone, label: "전화번호", value: "123-456-7890" },
        { icon: location, label: "주소", value: "서울특별시 강남구" },
        ]}
        layout="horizontal"
        splitRatio="2:8" // Sets the layout to 2:8
    />
);
// // 연락처 정보 구성 요소
// const ContactInfo: React.FC<{ iconSource: any; text: string }> = ({ iconSource, text }) => (
// <View className="flex-row items-center space-x-3 mb-1">
//     <Image source={iconSource} style={{ width: 16, height: 16 }} />
//     <StylizedText type="body2" styleClass="text-black ml-2">{text}</StylizedText>
// </View>
// );

// // 병원 요약 정보 Card 컴포넌트
// export const HospitalCard: React.FC<HospitalInfoCardProps> = ({ name, telephone, address }) => (
// <View className="px-4 my-1">
//     <RoundedBox shadow={true} preset="G">
//     <View className="flex-row items-center">
//         <Avatar size={50} className="mr-4" />
//         <View className='ml-4 mb-1'>
//         <StylizedText type="header2" styleClass="text-black">{name}</StylizedText>
//         <StylizedText type="body3" styleClass="text-black">{telephone}</StylizedText>
//         <StylizedText type="body3" styleClass="text-black">{address}</StylizedText>
//         </View>
//     </View>
//     </RoundedBox>
// </View>
// );