import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RoundedCircleButton} from '@common/RoundedButton';
import { DiseaseCard, VaccinationCard, OrderInfoCard } from '@components/InfoCards';
import WalkRecordingPanel from '@components/WalkingRecordPanel';
// import { HospitalInfoCard, HospitalCard } from '@components/InfoListCards';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const HealthCards = () => {
    return (
      <>
      <View className='flex-row flex-wrap align-center justify-around w-[95%]'>
        {/* <InfoBox icon={<MCIcon name="paw" size={30}/>}/> */}
        <DiseaseCard
          title="습진"
          percentage={83}
          icon badge
        />
        <DiseaseCard
          title="습진"
          percentage={83}
          icon
        />
        <DiseaseCard
          title="습진"
          percentage={33}
          icon badge
        />
        <DiseaseCard
          title="습진"
          percentage={33}
          icon
        />
        <DiseaseCard
          title="진드기"
          percentage={60}
          icon badge
        />
        <DiseaseCard
          title="진드기"
          percentage={60}
          icon
        />
        {/*  */}
        <DiseaseCard
          title="습진"
          percentage={83}
          body badge
        />
        <DiseaseCard
          title="진드기"
          percentage={60}
          body badge
        />
        <DiseaseCard
          title="습진"
          percentage={23}
          body
        />
      </View>
      <View className='flex-row flex-wrap align-center justify-around w-[90%]'>
        <VaccinationCard title='광견병' description='2023년 9월 23일에 접종되었습니다.' />
      </View>
      <View className='flex-row flex-wrap align-center justify-around w-[90%]'>
        <OrderInfoCard title='광견병' description='2023년 9월 23일에 접종되었습니다.' />
      </View>
    </>);
};

const BoxExample : React.FC<RootStackParamList> = () => {
  return (
    <SafeAreaView>
      <ScrollView className="" persistentScrollbar>
        <View className="flex-1 bg-black pt-10 px-5">
          <WalkRecordingPanel distanceInMeters={1500} timeInSeconds={932} />
          <HealthCards />
          <RoundedCircleButton onPress={() => console.log("button pressed!!!")} size={50}>
            <MCIcon name="paw" size={30}/>
          </RoundedCircleButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BoxExample;
