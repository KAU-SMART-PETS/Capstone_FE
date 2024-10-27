import React from 'react';
import { Image, View } from 'react-native';
import { RootStackParamList } from '@types';
import randomImg1 from '@image/placeholder/dog.jpg'
import { RoundedFrame } from '@components/common/RoundedBox';
import { TagBadge, PillBadge, Badge } from '@components/common/Badge';

const myAvatar = (
  <Image source={randomImg1} className='w-20 h-20 rounded-full'/>
)


const Example2 : React.FC<RootStackParamList> = () => {
  return (
    <>
    <View className='flex-row p-4'>
    <RoundedFrame>
      {myAvatar}
      <Badge text="심심하군" />
      <TagBadge text="공습경보" color="bg-blue" />
      <PillBadge text="인생한방"/>
    </RoundedFrame>
    <RoundedFrame>
      {myAvatar}
      <Badge text="졸리는군" />
      <TagBadge text="공습경보" color="bg-red" />
      <PillBadge text="인생한방"/>
    </RoundedFrame>
    </View>
    </>
  );
};

export default Example2;