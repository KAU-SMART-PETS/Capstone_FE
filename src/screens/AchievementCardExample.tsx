import React from 'react';
import { Image, View, Text } from 'react-native';
import RoundedBox from '@components/common/RoundedBox';
import { PillBadge } from '@components/common/Badge';
import { BannerSection } from '@components/common/Sections';
import Avatar from '@components/common/Avatar';
import StylizedText from '@components/common/StylizedText';
import dog1 from '@image/placeholder/dog2.jpg';
import FlatListCards from '@components/FlatListCards';


import registerPhotoImg from '@image/frame/registerPhoto.png';
import addDeviceImg from '@image/frame/addDevice.png'
import addPetImg from '@image/frame/addPet.png'
import WalkingdogIcon from '@image/icon/walkingDogIcon.png'
import ShadowBox from '@common/ShadowBox';
import { Shadow } from 'react-native-shadow-2';
import { Badge, Card, List } from 'react-native-paper';
import ListCard from '@components/common/ListCard';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RoundedCircleButton } from '@components/common/RoundedButton';

export const Card1 = () => {
  return (
    <RoundedBox
      isButton
      onPress={() => console.log('버튼테스트 1')}
      preset="flatcard"
      className="w-full"
    >
      <View className="flex-row w-full items-center">
        {/* 좌측 원형 이미지 영역 (20%) */}
        <View className="basis-1/5 flex justify-center items-center">
          <Avatar size={50} />
        </View>

        {/* 텍스트 영역 (80%) */}
        <View className="basis-4/5 flex flex-col justify-center items-start px-4 flex-shrink">
          {/* 제목 및 뱃지 영역 */}
          <View className="flex-row w-full justify-between items-center mb-1">
            {/* 제목 텍스트 */}
            <View className="flex-1">
              <StylizedText 
                type="header2"
                styleClass="text-black truncate"
              >
                7일 연속 산책하기
              </StylizedText>
            </View>
            {/* PillBadge */}
            <View className="ml-4 flex-shrink-0">
              <PillBadge
                text="달성"
                color="bg-primary"
                textColor="text-white"
              />
            </View>
          </View>
          {/* 설명 텍스트 */}
          <StylizedText 
            type="body2"
            styleClass="text-secondary truncate"
          >
            7일 연속 30분 이상 산책에 성공해보세요!
          </StylizedText>
        </View>
      </View>
    </RoundedBox>
  );  
};


const BannerExample: React.FC = () => {
    return (
    <View className="flex-col bg-white">
        {/* 단색 배경 배너 */}
        <BannerSection
        row1="오늘도 즐겁게"
        row2="산책을 시작해볼까요?"
        sideImg={WalkingdogIcon}
        onPress={() => console.log("Solid Banner Clicked")}
        />
        
        {/* 오버레이 배경 배너 */}
        <BannerSection
          row1="환상적인 여정"
          row2="지금 바로 떠나보세요"
          background={dog1}
          type="overlay"
          onPress={() => console.log("Overlay Banner Clicked")}
        />
      </View>
    );
};
const AchievementCardExample: React.FC<RootStackParamList> = () => {
    
  return (
    <View className="self-start"> 
      <View className='self-start'>
        <Card1 />
      </View>
      <FlatListCards />


      <View className='self-start'>
        <RoundedBox>
          <View className="flex-row items-center">
            <View className='flex ml-5'>
              <StylizedText 
                type="header2"
                styleClass='text-black'
                className="mb-2"
              >
                제품 구매하기
              </StylizedText>

              <StylizedText
                type='body2'
                styleClass='text-black'
              >
                누적된 포인트로 제품을 구매해보세요!
              </StylizedText>
            </View>
            <View className='pl-3 pr-3'>
              <Avatar
                source={require('@image/icon/bag.png')}
                size={40}
              />
            </View>
          </View>
        </RoundedBox>
      </View>


      <View className='flex-row'>
        <RoundedBox
          preset='F'
          isButton={true}
          shadow={false}
          className='p-0'
        >
          <View className=""> 
            <Image 
              source={registerPhotoImg}
              className="w-100 h-100" 
              resizeMode="contain"
            />
          </View>
        </RoundedBox>
      </View>

      <View className='flex-row'>
        <RoundedBox
          preset='F'
          isButton={true}
          shadow={false}
          className='p-0'
        >
          <View className=""> 
            <Image 
              source={addDeviceImg}
              className="w-20 h-20" 
              resizeMode="contain"
            />
          </View>
        </RoundedBox>
      </View>

      <View className='flex-row'>
        <RoundedBox
          preset='F'
          isButton={true}
          shadow={false}
          className='p-0'
        >
          <View className=""> 
            <Image 
              source={addPetImg}
              className="w-15 h-15" 
              resizeMode="contain"
            />
          </View>
        </RoundedBox>
      </View>
        <BannerExample />
    </View>
  );
}

export default AchievementCardExample;