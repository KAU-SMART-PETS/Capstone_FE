import React from 'react';
import { View, ImageSourcePropType, Image } from 'react-native';
import RoundedBox, {DesignPreset, OutlinePreset} from '@common/RoundedBox';
import StylizedText from '@common/StylizedText';

interface AvatarProps {
  source?: ImageSourcePropType | React.ReactNode | string;
  label?: string;
  size?: number;
}

const AvatarSection: React.FC<AvatarProps> = ({ 
  source, 
  label, 
  size = 48, 
}) => {
  const bgColor = 'bg-skyblue';
  const borderColor = 'border-primary';
  const borderSize = 2;
  const isImage = (source: any): source is ImageSourcePropType =>
    typeof source === 'number' || (typeof source === 'object' && source.uri);
  const isText = typeof source === 'string';
  return (
    <View className={`justify-center items-center ${label ? 'mt-1' : ''}`}>
      <View 
        className={`
          rounded-full overflow-hidden flex items-center justify-center mx-3
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
}

const ContentSection: React.FC<ContentProps> = ({ 
  title, 
  content, 
  badge, 
}) => {
  return (
    <View className="flex-1 min-w-0">
      <View className="flex-row items-center justify-between">
        {title && <View className="flex-1 min-w-0">{title}</View>} 
        {badge && <View className='ml-3'>{badge}</View>}
      </View>
      <View className="flex-row items-center mt-1">
      {content && <View className="flex-1 min-w-0">{content}</View>} 
      </View>
    </View>
  );
};

type Layout = 'simple' | 'contentOnly';

interface CardProps {
  layout?: Layout;
  avatar?: ImageSourcePropType | React.ReactNode;
  avatarSize?: number;
  label?: string;
  title?: React.ReactNode;
  content?: React.ReactNode;
  badge?: React.ReactNode;
  reverse?: boolean;
  shadow?: boolean;
  preset?: DesignPreset;
  outline?: OutlinePreset;
  onPress?: ()=> void;
}

const ListCard: React.FC<CardProps> = ({ 
  layout = 'simple',
  avatar, 
  avatarSize = 48,
  label, 
  title, 
  content, 
  badge,
  reverse = false,
  shadow = true,
  preset = 'flatcard',
  outline,
  onPress
}) => {
  return (
    <View className='mx-2' style={{ flexGrow: 1, flexShrink: 1, minWidth: 0 }}>
      <RoundedBox preset={preset} onPress={onPress} outline={outline} shadow={shadow}>
      <View className={`${reverse ? 'flex-row-reverse' : 'flex-row'} space-x-4 justify-between`}>
          {layout !== 'contentOnly' && 
            <AvatarSection 
              source={avatar} 
              label={label} 
              size={avatarSize} 
            />
          }
          <ContentSection 
            title={title} 
            content={content} 
            badge={badge} 
          />
        </View>
      </RoundedBox>
    </View>
  );
};

export default ListCard;
