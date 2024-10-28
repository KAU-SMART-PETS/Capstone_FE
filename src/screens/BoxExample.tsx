import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import { RootStackParamList } from '@types';
import fetchHospitalData from '@data/vets.json'; // JSON 파일 경로에 맞게 설정


import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RoundedCircleButton, RoundedTextButton} from '@common/RoundedButton';
import { DiseaseCard, VaccinationCard, OrderInfoCard } from '@components/InfoCards';
import { HospitalInfoCard, HospitalCard } from '@components/InfoListCards';
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


const HospitalCardExmaple: React.FC = () => {
  const [hospitalData, setHospitalData] = useState([]);
  
  useEffect(() => {
    const loadHospitalData = async () => {
      const data:any = await fetchHospitalData; // JSON 파일에서 병원 데이터를 불러옴
      setHospitalData(data);
    };

    loadHospitalData();
  }, []);

  return (
    <View>
      {hospitalData.map((hospital) => (
        <HospitalInfoCard
          key={hospital.id}
          name={hospital.name}
          address={hospital.address}
          telephone={hospital.telephone}
        />
      ))}
    </View>
  );
};

const HospitalListCardExample: React.FC = () => {
  const [hospitalData, setHospitalData] = useState([]);

  useEffect(() => {
    const loadHospitalData = async () => {
      const data:any = await fetchHospitalData; // JSON 파일에서 병원 데이터를 불러옴
      setHospitalData(data);
    };

    loadHospitalData();
  }, []);

  return (
    <View>
      {hospitalData.map((hospital) => (
        <HospitalCard
          key={hospital.id}
          name={hospital.name}
          address={hospital.address}
          telephone={hospital.telephone}
        />
      ))}
    </View>
  );
};


const BoxExample : React.FC<RootStackParamList> = () => {

  return (
    <SafeAreaView>
      <ScrollView className="" persistentScrollbar>
        <View className="flex-1 bg-white pt-10 px-5">
          <HealthCards />
          <RoundedCircleButton onPress={() => console.log("button pressed!!!")} size={10}>
            <MCIcon name="paw" size={30}/>
          </RoundedCircleButton>
          <HospitalCardExmaple/>
          <HospitalListCardExample/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BoxExample;
