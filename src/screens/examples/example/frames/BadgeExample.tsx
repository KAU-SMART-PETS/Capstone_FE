// App.tsx
import React from 'react';
import { View } from 'react-native';
import {PillBadge, TagBadge, Badge, RatingBadge} from '@common/Badge';
import StylizedText from '@common/StylizedText';
import RoundededBox from '@common/RoundedBox';

const BadgeExample: React.FC = () => {
  return (
    <View className="flex items-center justify-center bg-white p-4">
      <RoundededBox preset='modalC'>
        {/* RatingBadge 예제 */}
        <RatingBadge />
        {/* PillBadge 예제 */}
        <PillBadge text="New" color="bg-blue" textColor="text-white" />
        <PillBadge text="Popular" color="bg-lightgrey" textColor="text-secondary" />
        {/* Badge 예제 */}
        <Badge text="Standard" color="bg-green" textColor="text-white"/>
        <Badge text="Sale" color="bg-yellow" textColor="text-black" />
      </RoundededBox>
      {/* TagBadge 예제 */}
      <RoundededBox preset='modalC'>
        <TagBadge text="Hot" color="bg-red" textColor="text-white" />
        <StylizedText type='label2'>태그뱃지는 우측상단 모서리에 얹어짐</StylizedText>
      </RoundededBox>
    </View>
  );
};

export default BadgeExample;
