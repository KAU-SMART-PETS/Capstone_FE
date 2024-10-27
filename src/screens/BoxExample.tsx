import React, {useState, useEffect} from 'react';
import { View, Image, Text } from 'react-native';
import { RootStackParamList } from '@types';
import fetchHospitalData from '@data/vets.json'; // JSON 파일 경로에 맞게 설정


import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AvatarPlaceholder from '@image/placeholder/dog.jpg';
import StylizedText from '@components/common/StylizedText';
import RoundedBox from '@common/RoundedBox';
import {RoundedCircleButton, RoundedTextButton} from '@common/RoundedButton';
import ShadowBox from '@common/ShadowBox';
import { DiseaseCard, VaccinationCard, OrderInfoCard, HospitalInfoCard, HospitalCard } from '@components/InfoCards';

export const ButtonSquare1 = () => {
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
    <View className="flex-1 bg-white pt-10 px-5">
      {/* <ButtonSquare1 />
      <RoundedCircleButton onPress={() => console.log("button pressed!!!")} size={10}>
        <MCIcon name="paw" size={30}/>
      </RoundedCircleButton> */}
      <HospitalCardExmaple/>
      <HospitalListCardExample/>
    </View>
  );
};

export default BoxExample;
