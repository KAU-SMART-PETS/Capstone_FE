import React from 'react';
import { ScrollView } from 'react-native';
import { HeaderText } from '@common/StylizedText';
import { HospitalRecord, WalkingRecord, WarningRecord } from '@components/Records';
import dog2 from '@image/placeholder/dog2.jpg';

const RecordExample: React.FC = () => {
  const petName = '초롱이';
  return (
    <ScrollView className="flex-1 bg-white p-2">
      <HeaderText text={`${petName}의 일주일은 어땠을까요?`} highlight={petName} />
      <HeaderText text="아래를 스크롤 해서 살펴보세요!" highlight="스크롤" />
      {/* 주의사항 레코드 Section */}
      <WarningRecord message="해당 리포트는 참고용 자료이며 정확한 진단은 인근 동물병원에서 해주세요." />
      {/* 병원정보 레코드 Section */}
      <HospitalRecord
        name="해피동물병원"
        address="서울특별시 강남구 강남대로 1234"
        telephone="02-123-4567"
      />
      {/* 산책기록 레코드 Section */}
      <WalkingRecord
        avatarSource={dog2}
        walkDate="2023-11-01"
        walkTime="30분"
        distance="2.5km"
        calories="200kcal"
        steps="4000걸음"
      />
    </ScrollView>
  );
};

export default RecordExample;
