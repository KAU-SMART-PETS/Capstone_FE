import React from 'react';
import { View, ImageSourcePropType, Image } from 'react-native';
import RoundedBox from '@common/RoundedBox';
import StylizedText from '@common/StylizedText';

interface AvatarProps {
  source?: ImageSourcePropType | React.ReactNode | string;
  label?: string;
  size?: number;
  borderSize?: number;
  borderColor?: string;
  bgColor?: string;
}

const AvatarSection: React.FC<AvatarProps> = ({ 
  source, 
  label, 
  size = 48, 
  borderSize = 2, 
  borderColor = 'border-primary',
  bgColor = 'bg-skyblue'
}) => {
  const isImage = (source: any): source is ImageSourcePropType =>
    typeof source === 'number' || (typeof source === 'object' && source.uri);

  const isText = typeof source === 'string';

  return (
    <View className={`justify-center items-center ${label ? 'mt-1' : ''}`}>
      <View 
        className={`
          rounded-full overflow-hidden flex items-center justify-center
          ${isImage(source) ? '' : `${bgColor} border-${borderSize} ${borderColor}`}
        `}
        style={{ width: size, height: size }}
      >
        {isImage(source) ? (
          <Image source={source} style={{ width: size, height: size }} resizeMode="cover" />
        ) : isText ? (
          <StylizedText type="label3" styleClass="text-black">{source}</StylizedText>
        ) : (
          <View className="flex items-center justify-center" style={{ width: size, height: size }}>
            {source}
          </View>
        )}
      </View>
      {label && <StylizedText styleClass="text-black mt-1" type="label3">{label}</StylizedText>}
    </View>
  );
};

interface ContentProps {
  title?: React.ReactNode;
  content?: React.ReactNode;
  badge?: React.ReactNode;
  extra?: React.ReactNode;
  extraPosition?: 'title-start' | 'title-end' | 'content-start' | 'content-end';
}

const ContentSection: React.FC<ContentProps> = ({ 
  title, 
  content, 
  badge, 
  extra, 
  extraPosition = 'title-end' 
}) => {
  return (
    <View className="flex-1 pl-4">
      <View className="flex-row items-center justify-between">
        {extra && extraPosition === 'title-start' && extra}
        {title && <View className="flex-1">{title}</View>}
        {badge && <View>{badge}</View>}
        {extra && extraPosition === 'title-end' && extra}
      </View>
      
      <View className="flex-row items-center mt-1">
        {extra && extraPosition === 'content-start' && extra}
        {content && <View className="flex-1">{content}</View>}
        {extra && extraPosition === 'content-end' && extra}
      </View>
    </View>
  );
};

type Layout = 'simple' | 'detailed' | 'labelled' | 'contentOnly';

interface CardProps {
  layout?: Layout;
  avatar?: ImageSourcePropType | React.ReactNode;
  label?: string;
  title?: React.ReactNode;
  content?: React.ReactNode;
  badge?: React.ReactNode;
  extra?: React.ReactNode;
  extraPosition?: 'title-start' | 'title-end' | 'content-start' | 'content-end';
  reverse?: boolean;
}

const ListCard: React.FC<CardProps> = ({ 
  layout = 'simple',
  avatar, 
  label, 
  title, 
  content, 
  badge,
  extra,
  extraPosition = 'title-end',
  reverse = false
}) => {
  return (
    <View className="mx-2">
      <RoundedBox preset="flatcard">
        <View className={`${reverse ? 'flex-row-reverse' : 'flex-row'}`}>
          {layout !== 'contentOnly' && (
            <AvatarSection 
              source={avatar} 
              label={label} 
              size={48} 
              borderSize={2} 
              borderColor="border-primary" 
              bgColor="bg-skyblue"
            />
          )}

          <ContentSection 
            title={title} 
            content={content} 
            badge={badge} 
            extra={extra} 
            extraPosition={extraPosition}
          />
        </View>
      </RoundedBox>
    </View>
  );
};

export default ListCard;
