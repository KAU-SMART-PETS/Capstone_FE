import React from 'react';
import { Image, View, Text } from 'react-native';
import RoundedBox from '@components/common/RoundedBox';
import { PillBadge } from '@components/common/Badge';
import { BannerSection } from '@components/common/Sections';
import Avatar from '@components/common/Avatar';
import StylizedText from '@components/common/StylizedText';
import dog1 from '@image/placeholder/dog2.jpg';

import registerPhotoImg from '@image/frame/registerPhoto.png';
import addDeviceImg from '@image/frame/addDevice.png'
import addPetImg from '@image/frame/addPet.png'
import WalkingdogIcon from '@image/icon/walkingDogIcon.png'
import ShadowBox from '@common/ShadowBox';
import { Shadow } from 'react-native-shadow-2';

export const AchievementExample = () => {
  return (
    <View className="flex-1 bg-[#F7F7F7] p-5">
      {/* Example of using RoundedBox with a badge */}
      <RoundedBox
        preset="A"
        shadow={true}
        // borderActivate={true}
        isButton={true}
      >
        <View className="p-4">
          
        </View>
      </RoundedBox>
    </View>
  );
};

const BannerExample: React.FC = () => {
    return (
    <View className="flex-1 justify-center items-center bg-white">
        {/* 단색 배경 배너 */}
        {/* <BannerSection
        row1="오늘도 즐겁게"
        row2="산책을 시작해볼까요?"
        img={WalkingdogIcon}
        type="solid"
        background='darkgreen'
        onPress={() => console.log("Solid Banner Clicked")}
        /> */}
        
        {/* 오버레이 배경 배너 */}
        <BannerSection
        row1="환상적인 여정"
        row2="지금 바로 떠나보세요"
        background={dog1}
        type="overlay"
        onPress={() => console.log("Overlay Banner Clicked")}
        />
        <View className='bg-white w-20 h-20' style={{shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.22,
shadowRadius: 2.22,

elevation: 3}}>

<Text>123</Text>
        </View>
        <ShadowBox className='w-36 h-36 bg-white'><Text>안녕하세요</Text></ShadowBox>
    </View>
    );
    };

const AchievementCardExample: React.FC<RootStackParamList> = () => {
    
  return (
    <View className="self-start"> 
      <View className='self-start'>
        <RoundedBox
          preset="A"
          isButton={false}
          shadow={true}
        //   borderActivate={false}
        >
          <View className="flex-row items-center pl-4 pr-4">
            <View>
              <Avatar 
                size={40}
              />
            </View>

            <View className="flex ml-5">
              <View className="flex-row justify-between items-center mb-2">
                <StylizedText 
                  type="header2"
                  color="text-black"
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
                color="text-darkgrey"
              >
                7일 연속 30분 이상 산책에 성공해보세요!
              </StylizedText>
            </View>
          </View>
        </RoundedBox>
      </View>

      <View className='self-start'>
        <RoundedBox>
          <View className="flex-row items-center">
            <View className='flex ml-5'>
              <StylizedText 
                type="header2"
                color='text-black'
                className="mb-2"
              >
                제품 구매하기
              </StylizedText>

              <StylizedText
                type='body2'
                color='text-black'
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