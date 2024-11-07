import React from 'react';
import ModalLayout from '@src/components/ModalLayout';
import { RoundedTextButton } from '@src/components/common/RoundedButton';
import StylizedText from '@src/components/common/StylizedText';
import CustomTextInput from '@src/components/common/CustomTextInput';
import { Avatar } from 'react-native-paper';

interface ModalWindowProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  selectedVaccination?: boolean; 
  newInfo: { date: string; name: string };
  handleDateChange: (text: string) => void;
  setNewInfo: (info: { date: string; name: string }) => void;
  handleSaveInfo: () => void;
  isLoading: boolean;
}

const VaccinationModal: React.FC<ModalWindowProps> = ({
  visible,
  setVisible,
  selectedVaccination,
  newInfo,
  handleDateChange,
  setNewInfo,
  handleSaveInfo,
  isLoading,
}) => {
  // 취소 버튼
  const CancelButton = (
    <RoundedTextButton
      content="취소"
      color="bg-secondary"
      widthOption="sm"
      onPress={() => setVisible(false)}
    />
  );

  // 저장 버튼
  const SaveButton = (
    <RoundedTextButton
      content="저장"
      color="bg-primary"
      widthOption="sm"
      onPress={handleSaveInfo}
      disabled={isLoading}
    />
  );

  // 제목 설정
  const modalTitle = selectedVaccination ? '보건정보 수정' : '새 보건정보 추가';

  // 설명 텍스트
  const DescriptionText = (
    <StylizedText key="description" type="body2" styleClass="text-black">
      보건정보를 입력해주세요.
    </StylizedText>
  );

  // 날짜 입력 필드
  const DateInput = (
    <CustomTextInput
      label="날짜"
      value={newInfo.date}
      onChangeText={handleDateChange}
      placeholder="YYYYMMDD"
      keyboardType="numeric"
      maxLength={8}
    />
  );

  // 접종 정보 입력 필드
  const VaccinationInput = (
    <CustomTextInput
      label="접종 정보"
      value={newInfo.name}
      onChangeText={(text) => setNewInfo({ ...newInfo, name: text })}
      placeholder="예: 광견병 예방접종"
    />
  );

  return (
    <ModalLayout
      visible={visible}
      setVisible={setVisible}
      position="bottom"
      title={modalTitle}
      titleAlign="left"
      rows={[
        {
          content: [DescriptionText, DateInput, VaccinationInput],
        },
        {
          content: [CancelButton, SaveButton],
          layout: 'row',
        },
      ]}
    />
  );
};

export default VaccinationModal;