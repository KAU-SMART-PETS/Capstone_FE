import React from 'react';
import { Image, View } from 'react-native';
import { RootStackParamList } from '@types';
import RoundedBox from '@components/common/RoundedBox';
import { PillBadge } from '@components/common/Badge';
import RectangleBox from '@components/common/RectangularBox';
import Avatar from '@components/common/Avatar';
import StylizedText from '@components/common/StylizedText';

import registerPhotoImg from '@image/frame/registerPhoto.png';
import addDeviceImg from '@image/frame/addDevice.png'
import addPetImg from '@image/frame/addPet.png'
import WalkingdogIcon from '@image/icon/walkingDogIcon.png'

const AchievementCardExample: React.FC<RootStackParamList> = () => {

  return (
    <View className="self-start"> 
      <View className='self-start'>
        <RoundedBox
          preset="A"
          isButton={false}
          shadow={true}
          borderActivate={false}
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
                color="text-grey"
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

      <View className='w-full'>
        <RectangleBox
          preset='A' 
        >
          <View className='flex-row justify-between items-center'>
            <View>
              <View className='mb-3'>
                <StylizedText
                  type='header1'
                >
                  오늘도 즐겁게 
                </StylizedText>
              </View>
              <StylizedText
                type='header1'
              >
                산책을 시작해볼까요?
              </StylizedText>
            </View>
            <View className='ml-5'>
              <Image source={WalkingdogIcon}/>
            </View>
          </View>

        </RectangleBox>
      </View>
    </View>
  );
}

export default AchievementCardExample;