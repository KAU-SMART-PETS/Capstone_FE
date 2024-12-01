import React, { useState, useRef } from 'react';
import { View, ScrollView, Text, Alert } from 'react-native';
import { BannerSection } from '@components/common/BannerSection';
import WalkingdogIcon from '@image/icon/walkingDogIcon.png';
import dog1 from '@image/placeholder/dog2.jpg';
import { WalkDetailsCard } from '@components/FlatListCards';
import { RoundedTextButton } from '@components/common/RoundedButton';
import ModalLayout from '@components/ModalLayout';
import RadioButtonGroup from '@common/RadioButtonGroup';
import RadioButton from '@common/RadioButton';
import StylizedText from '@common/StylizedText';
import Avatar from '@common/Avatar';
import { Provider as PaperProvider } from 'react-native-paper';

const WalkStartPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const radioButtonGroupRef = useRef<any>(null);

  // 외부에서 라디오 버튼 선택 제출 함수
  const handleExternalSubmit = () => {
    if (radioButtonGroupRef.current) {
      radioButtonGroupRef.current.submit();
    }
  };

  return (
    <PaperProvider>
      <ScrollView className="flex-1 bg-white">
        {/* 상단 배너 */}
        <View className="mb-2 mt-10">
          <BannerSection
            row1="오늘도 즐겁게"
            row2="산책을 시작해볼까요?"
            sideImg={WalkingdogIcon}
            onPress={() => console.log("오늘도 즐겁게 배너 클릭됨")}
          />

          <View className="px-4 mb-2 mt-2 ml-4">
            <Text className="text-lg font-bold text-gray-800">최근 산책</Text>
          </View>

          {/* 산책 기록 카드 */}
          <WalkDetailsCard 
            title="하늘이"
            details={[
              { label: "산책일시", value: "2024.05.18" },
              { label: "산책 시간", value: "00:10:00" },
              { label: "이동 거리", value: "2.00km" }
            ]}
          />
          <WalkDetailsCard 
            title="하늘이"
            details={[
              { label: "산책일시", value: "2024.05.18" },
              { label: "산책 시간", value: "00:10:00" },
              { label: "이동 거리", value: "2.00km" }
            ]}
          />
          <WalkDetailsCard 
            title="하늘이"
            details={[
              { label: "산책일시", value: "2024.05.18" },
              { label: "산책 시간", value: "00:10:00" },
              { label: "이동 거리", value: "2.00km" }
            ]}
          />
          <WalkDetailsCard 
            title="하늘이"
            details={[
              { label: "산책일시", value: "2024.05.18" },
              { label: "산책 시간", value: "00:10:00" },
              { label: "이동 거리", value: "2.00km" }
            ]}
          />
        </View>

        {/* 산책 시작하기 버튼 */}
        <View className="p-4">
          <RoundedTextButton
            color="bg-primary"
            textColor="text-white"
            content="산책 시작하기"
            borderRadius="rounded-3xl"
            widthOption="full"
            shadow={true}
            onPress={() => setIsModalVisible(true)}
          />
        </View>

        {/* ModalLayout 모달 */}
        <ModalLayout
          visible={isModalVisible}
          setVisible={setIsModalVisible}
          position="bottom"
          transparent
          title="산책할 반려동물을 선택해주세요."
          titleAlign="left"
          rows={[
            {
              content: [
                <View key="radioButtons" className="px-12 mt-6">
                  <RadioButtonGroup
                    ref={radioButtonGroupRef}
                    maxChoice={1} // 하나의 선택지만 가능
                    onSubmit={(selectedIds) => {
                      Alert.alert('선택된 반려동물:', JSON.stringify(selectedIds));
                      setIsModalVisible(false); // 제출 후 모달 닫기
                    }}
                    containerStyle="flex-row justify-around"
                  >
                    <RadioButton>
                      <Avatar size={60} />
                      <StylizedText type="body1" styleClass="mt-3">하늘이</StylizedText>
                    </RadioButton>
                    <RadioButton>
                      <Avatar size={60} />
                      <StylizedText type="body1" styleClass="mt-3">바둑이</StylizedText>
                    </RadioButton>
                  </RadioButtonGroup>

                  {/* 제출 버튼 */}
                  <RoundedTextButton
                    content="산책하기"
                    widthOption="xl"
                    onPress={handleExternalSubmit}
                  />
                </View>
              ],
            },
          ]}
        />
      </ScrollView>
    </PaperProvider>
  );
};

export default WalkStartPage;