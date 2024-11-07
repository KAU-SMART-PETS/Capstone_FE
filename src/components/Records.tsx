import React from 'react';
import RecordSection from '@common/RecordSection';
import { Image, ImageSourcePropType } from 'react-native';
import phoneIcon from '@image/icon/phone.png';
import locationIcon from '@image/icon/location.png';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Avatar from '@common/Avatar';
import { RatingBadge } from '@common/Badge';

interface HospitalRecordProps {
  name: string;
  address: string;
  telephone: string;
  distance: number;
}

interface WalkingRecordProps {
  avatarSource?: ImageSourcePropType | string;
  walkDate: string;
  walkTime: string;
  distance: string;
  calories: string;
  steps: string;
}

export const HospitalRecord: React.FC<HospitalRecordProps> = ({ name, address, telephone, distance }) => {
  const fields = [
    { label: <Image source={phoneIcon} style={{ width: 16, height: 16 }} />, value: telephone },
    { label: <Image source={locationIcon} style={{ width: 16, height: 16 }} />, value: address },
    { label: <Image source={locationIcon} style={{ width: 16, height: 16 }} />, value: distance },
  ];

  return (
    <RecordSection
      title={name}
      fields={fields}
      // badge={<RatingBadge starSize={20} textSize="header5" rating={3.5} />}
      labelWidth="w-8"
      footerText="참고: 병원 운영 시간에 따라 전화 응답이 제한될 수 있습니다."
      preset="iconLabel"
    />
  );
};

export const WalkingRecord: React.FC<WalkingRecordProps> = ({ avatarSource, walkDate, walkTime, distance, calories, steps }) => {
  const fields = [
    { label: '산책 일시', value: walkDate },
    { label: '산책 시간', value: walkTime },
    { label: '이동 거리', value: distance },
    { label: '소모 칼로리', value: calories },
    { label: '걸음 수', value: steps },
  ];
  // Avatar 컴포넌트를 조건부로 렌더링
  const AvatarComponent = avatarSource ? <Avatar source={avatarSource} size={35} /> : null;
  return (
    <RecordSection
      title="오늘의 산책 기록"
      fields={fields}
      badge={AvatarComponent}
      footerText="소모 칼로리와 걸음 수를 측정하기 위해서는 디바이스가 필요해요!"
      preset="walkRecord"
    />
  );
};

export const WarningRecord = ({ message }: { message: string }) => {
  return (
    <RecordSection
      title="주의 사항"
      titleIcon={<MCIcon name="alert-circle-outline" size={20} color="#A0A0A0" />}
      fields={[{ label: message }]}
      rowFlex
      preset="caution"
    />
  );
};
