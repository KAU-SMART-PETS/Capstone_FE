import React from 'react';
import { View, Image, Text } from 'react-native';
import ColorMap from '@common/ColorMap';
import { TagBadge } from '@common/Badge';
import { DesignPreset, RoundedFrame } from '@common/RoundedBox';
import RoundedBox from '@common/RoundedBox';
import Avatar from '@common/Avatar';

import phone from '@image/icon/phone.png';
import location from '@image/icon/location.png';

import StylizedText from '@common/StylizedText';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome5'
import ShadowBox from './common/ShadowBox';

// DiseaseCard, VaccinationCard, OrderInfoCard, HospitalInfoCard

interface DiseaseCardProps {
  title: string;
  percentage?: number;
  preset?: DesignPreset;
  badge?: boolean;
  body?: boolean;
  icon?: boolean;
}

const getInfoColor = (percentage?: number) => {
  if (percentage === undefined) return 'black';
  if (percentage > 70) return 'danger';
  if (percentage > 40) return 'warning';
  return 'safe';
};

const getBadgeText = (percentage?: number) => {
  if (percentage === undefined) return '기본';
  if (percentage >= 70) return '위험';
  if (percentage >= 40) return '주의';
  return '안전';
};

const getInfoIcon = (percentage?: number) => {
  const iconSize: number = 20;
  const iconColor: string = ColorMap['black'];

  if (percentage === undefined) return <MCIcon name="paw" size={iconSize} color={iconColor} />;
  if (percentage >= 80) return <FAIcon name="syringe" size={iconSize} color={iconColor} />;
  if (percentage >= 60) return <MCIcon name="stethoscope" size={iconSize} color={iconColor} />;
  return <MCIcon name="emoticon-happy-outline" size={iconSize} color={iconColor} />;
};

// Description을 percentage 값에 따라 설정
const getDescription = (percentage?: number) => {
  if (percentage === undefined) return '상태 정보를 확인할수 없어요.';
  if (percentage >= 80) return '치료가 필요해요.';
  if (percentage >= 60) return '계속 주의해야해요.';
  return '비교적 건강한 상태에요.';
};

export const DiseaseCard: React.FC<DiseaseCardProps> = ({
  title = 'Default Title',
  percentage,
  badge = false,
  body = false,
  icon = false,
}) => {
  const percentColor = `text-${getInfoColor(percentage)}`;
  const badgeColor = `bg-${getInfoColor(percentage)}`;
  const badgeText = getBadgeText(percentage);
  const infoIcon = icon && !body ? getInfoIcon(percentage) : null; // Only show icon if body is false
  const description = getDescription(percentage);
  const preset = 'greycard';

  return (
    <RoundedBox preset={preset} shadow={false}>
      {badge && <TagBadge text={badgeText} color={badgeColor} />}
      <View className={`${body && 'px-2'}`}>
        {/* Title (First Row) */}
        <View className={`mt-1 flex-row items-center justify-between min-w-24 ${body ? 'relative bottom-[-5]' : 'items-center'}`}>
          <StylizedText type="header4" styleClass="text-black">{title}</StylizedText>
        </View>
        { !body && <View className="h-3"/> }
        {/* Body or Icon (Second Row) */}
        <View className={`flex-row justify-between ${body ? 'items-start' : 'items-center'}`}>
          {infoIcon && <View className="mr-5 ml-1">{infoIcon}</View>}
          {body && <StylizedText type='body3' styleClass='text-secondary mr-6 mt-1'>{description}</StylizedText>}
          {/* Percentage (if applicable) */}
          {percentage !== undefined && (
            <View className={`flex-col flex items-center mb-1 justify-end -mr-0.5 ${body && 'releative bottom-0.5'}`}>
              {!body && <StylizedText type="label4" styleClass='text-black leading-none relative bottom-[-5.5]'>Percentage</StylizedText>}
              <View className="flex flex-row items-end">
                <StylizedText type="header5" styleClass={percentColor}>{percentage}</StylizedText>
                <StylizedText type="label3" styleClass='text-black mb-1 ml-0.5'>%</StylizedText>
              </View>
            </View>
          )}
        </View>
      </View>
    </RoundedBox>
  );
};

interface VaccinationCardProps {
  title: string;
  description: string;
  preset?: DesignPreset;
}

export const VaccinationCard: React.FC<VaccinationCardProps> = ({
  title,
  description,
}) => {
  const preset:DesignPreset = "greycard";
  return (
      <RoundedBox preset={preset} shadow={false}>
          <View className='min-w-full px-3'>
          <View className="mt-1">
            <StylizedText type="header4" styleClass="text-black">{title}</StylizedText>
          </View>
          {/* Body (Second Row) */}
          <View className="mb-1">
            <StylizedText type="body3" styleClass="text-black">{description}</StylizedText>
          </View>
          </View>
      </RoundedBox>
  );
};

export const OrderInfoCard: React.FC<VaccinationCardProps> = ({
  title,
  description,
}) => {
  const preset:DesignPreset = "dashedcard";
  return (
      <RoundedBox preset={preset} shadow={false} outline='dashed'>
          <View className='min-w-full px-3 flex justify-center items-center'>
          {/* Body (Second Row) */}
          <View className="mb-1">
            <StylizedText type="body3" styleClass="text-black">{description}</StylizedText>
          </View>
          </View>
      </RoundedBox>
  );
};

interface HospitalInfoCardProps {
  name: string;
  address: string;
  telephone: string;
}

// 병원 정보를 표시하는 Card 컴포넌트
export const HospitalInfoCard: React.FC<HospitalInfoCardProps> = ({ name, address, telephone }) => (
  <View className="p-4 space-y-3">
    <StylizedText type="header1" styleClass="text-black mb-2">{name}</StylizedText>
    <ContactInfo iconSource={phone} text={telephone} />
    <ContactInfo iconSource={location} text={address} />
  </View>
);

// 연락처 정보 구성 요소
const ContactInfo: React.FC<{ iconSource: any; text: string }> = ({ iconSource, text }) => (
  <View className="flex-row items-center space-x-3 mb-1">
    <Image source={iconSource} style={{ width: 16, height: 16 }} />
    <StylizedText type="body2" styleClass="text-black ml-2">{text}</StylizedText>
  </View>
);

// 병원 요약 정보 Card 컴포넌트
export const HospitalCard: React.FC<HospitalInfoCardProps> = ({ name, telephone, address }) => (
  <View className="px-4 my-1">
    <RoundedBox shadow={true} preset="G">
      <View className="flex-row items-center">
        <Avatar size={50} className="mr-4" />
        <View className='ml-4 mb-1'>
          <StylizedText type="header2" styleClass="text-black">{name}</StylizedText>
          <StylizedText type="body3" styleClass="text-black">{telephone}</StylizedText>
          <StylizedText type="body3" styleClass="text-black">{address}</StylizedText>
        </View>
      </View>
    </RoundedBox>
  </View>
);