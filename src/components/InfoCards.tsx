import React from 'react';
import { View } from 'react-native';
import ColorMap from '@common/ColorMap';
import { TagBadge } from '@common/Badge';
import { DesignPreset } from '@common/RoundedBox';
import RoundedBox from '@common/RoundedBox';
import StylizedText from '@common/StylizedText';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome5'
import { TouchableOpacity } from 'react-native';

// TODO : VaccinationCard 에 onPress 속성 추가

interface DiseaseCardProps {
  title: string;
  percentage?: number;
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
  onPress?: () => void;
}

export const VaccinationCard: React.FC<VaccinationCardProps> = ({
  title,
  description,
  onPress, // onPress 속성 받기
}) => {
  const preset: DesignPreset = "greycard";

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <RoundedBox preset={preset} shadow={false}>
        <View className="min-w-full px-3">
          <View className="mt-1">
            <StylizedText type="header4" styleClass="text-black">
              {title}
            </StylizedText>
          </View>
          <View className="mb-1">
            <StylizedText type="body3" styleClass="text-black">
              {description}
            </StylizedText>
          </View>
        </View>
      </RoundedBox>
    </TouchableOpacity>
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
