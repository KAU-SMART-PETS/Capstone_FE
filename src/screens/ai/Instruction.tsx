import React from 'react';
import { View, Image, FlatList, ImageSourcePropType } from 'react-native';
import StylizedText from '@common/StylizedText';
import HeaderBar from '@components/HeaderBar';
import SCAN_TYPES, {IncorrectExample} from './ScanTypes';

interface InstructionProps {
  scanType?: string; // scanType은 선택적 prop
}

const Instruction: React.FC<InstructionProps> = ({ scanType = 'EYE_SCAN' }) => {
  const scanConfig = SCAN_TYPES[scanType];
  if (!scanConfig) {
    return (
      <View className="flex-1 justify-center items-center bg-white px-8">
        <HeaderBar showBackButton title="오류" />
        <StylizedText type="header1" styleClass="text-red-500 mb-4 text-center">
          잘못된 스캔 유형입니다.
        </StylizedText>
        <StylizedText type="body2" styleClass="text-gray-500 text-center">
          다시 시도해주세요.
        </StylizedText>
      </View>
    );
  }

  const { title, instruction } = scanConfig;
  const { header, body, examples } = instruction;

  const renderExample = (type: 'correct' | 'incorrect') => {
    const data = examples[type];
    return (
      <FlatList
        data={data}
        horizontal
        keyExtractor={(_, index) => `${type}-${index}`}
        renderItem={({ item }) => (
          <View className="items-center mr-4">
            <Image source={item.source} className="w-20 h-20 rounded-lg" />
            {type === 'correct' ? (
              <Image source={require('@image/icon/check.png')} className="w-6 h-6 mt-2" />
            ) : (
              <View className="items-center mt-2">
                <Image source={require('@image/icon/x.png')} className="w-6 h-6" />
                <StylizedText type="caption-label" styleClass="text-gray-500 text-center mt-1 w-24">
                  {(item as IncorrectExample).description}
                </StylizedText>
              </View>
            )}
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
    );
  };

  return (
    <View className="flex-1 bg-white">
      <HeaderBar showBackButton title={title} />
      <View className="flex-1 px-8 py-4">
        <View className="mb-8 pb-8 border-b border-gray-200">
          <StylizedText type="header1" styleClass="text-black mb-3">
            {header}
          </StylizedText>
          <StylizedText type="body2" styleClass="text-gray-500">
            {body}
          </StylizedText>
        </View>
        <View className="mb-6">
          {renderExample('correct')}
        </View>
        <View>
          {renderExample('incorrect')}
        </View>
      </View>
    </View>
  );
};

export default Instruction;
