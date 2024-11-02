import React from 'react';
import { View } from 'react-native';
import { PaperProvider, Button } from 'react-native-paper';
import ModalLayout from '@components/ModalLayout';
import StylizedText from '@components/common/StylizedText';
import { RoundedTextButton } from '@components/common/RoundedButton';
import Avatar from '@components/common/Avatar';

type ModalWindowProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

// 버튼을 눌렀을 때 실행되는 핸들러 함수
const handleButtonPress = (action: () => void, setVisible: (visible: boolean) => void) => {
  return () => {
    action();
    setVisible(false);
  };
};

// ModalType1: 두 줄로 버튼 배치
const ModalType1: React.FC<ModalWindowProps> = ({ visible, setVisible }) => {
  const GalleryButton = (
    <RoundedTextButton
      content="갤러리에서 가져오기"
      widthOption="lg"
      color="bg-primary"
      onPress={handleButtonPress(() => console.log('갤러리에서 가져오기'), setVisible)}
    />
  );

  const CameraButton = (
    <RoundedTextButton
      content="촬영하기"
      widthOption="lg"
      color="bg-primary"
      onPress={handleButtonPress(() => console.log('촬영하기'), setVisible)}
    />
  );

  return (
    <ModalLayout
      visible={visible}
      setVisible={setVisible}
      rows={[{ content: [GalleryButton, CameraButton], layout: 'col' }]}
    />
  );
};

// ModalType2: 제목과 나란히 있는 두 개의 버튼
const ModalType2: React.FC<ModalWindowProps> = ({ visible, setVisible }) => {
  const CancelButton = (
    <RoundedTextButton
      content="취소"
      color="bg-secondary"
      widthOption="sm"
      onPress={handleButtonPress(() => console.log('취소'), setVisible)}
    />
  );

  const FinishButton = (
    <RoundedTextButton
      content="종료"
      color="bg-primary"
      widthOption="sm"
      onPress={handleButtonPress(() => console.log('종료'), setVisible)}
    />
  );

  return (
    <ModalLayout
      visible={visible}
      setVisible={setVisible}
      title="산책을 종료하시겠어요?"
      rows={[{ content: [CancelButton, FinishButton], layout: 'row' }]}
    />
  );
};

// ModalType3: 제목과 단일 버튼
const ModalType3: React.FC<ModalWindowProps> = ({ visible, setVisible }) => {
  const CancelButton = (
    <RoundedTextButton
      content="취소"
      color="bg-primary"
      widthOption="sm"
      onPress={handleButtonPress(() => console.log('취소'), setVisible)}
    />
  );

  return (
    <ModalLayout
      visible={visible}
      setVisible={setVisible}
      title="오늘도 함께 산책해줘서 고마워요!"
      rows={[{ content: [CancelButton], layout: 'col' }]}
    />
  );
};

// ModalType4: 설명 텍스트와 버튼 그룹 포함
const ModalType4: React.FC<ModalWindowProps> = ({ visible, setVisible }) => {
  const CancelButton = (
    <RoundedTextButton
      content="취소"
      color="bg-secondary"
      widthOption="sm"
      onPress={handleButtonPress(() => console.log('취소'), setVisible)}
    />
  );

  const ConfirmButton = (
    <RoundedTextButton
      content="확인"
      color="bg-primary"
      widthOption="sm"
      onPress={handleButtonPress(() => console.log('확인 클릭됨'), setVisible)}
    />
  );

  const DescriptionText = (
    <StylizedText key="description" type="body2" styleClass="text-black">
      여기에 설명 텍스트가 표시됩니다.
    </StylizedText>
  );

  return (
    <ModalLayout
      visible={visible}
      setVisible={setVisible}
      position='bottom'
      title="여기에 설명 텍스트가 표시됩니다."
      titleAlign='left'
      rows={[
        {
          content: [DescriptionText, <Avatar/>]
        },
        {
          content: [CancelButton, ConfirmButton], layout: 'row',
        },
      ]}
    />
  );
};

// 하단 모달
const ModalType5: React.FC<ModalWindowProps> = ({ visible, setVisible }) => {
  const ExampleButton = (
    <RoundedTextButton
      content="취소"
      color="bg-secondary"
      widthOption="lg"
      onPress={handleButtonPress(() => console.log('투명모달 버튼눌림'), setVisible)}
    />
  );

  return (
    <ModalLayout
      visible={visible}
      setVisible={setVisible}
      position='bottom'
      transparent // 배경 투명화 옵션
      title="여기에 설명 텍스트가 표시됩니다."
      titleAlign='left'
      rows={[
        {
          content: [ExampleButton, <Avatar/>]
        },
      ]}
    />
  );
};


// ModalExample: 예시 컴포넌트
// CAUTION : ModalType은 하나의 예시이지, 컴포넌트가 아님! (ModalLayout을 어떻게 쓰는 지 보여준 것)
// ModalType을 참고해서 저렇게 만들라는 뜻임.
const ModalExample: React.FC = () => {
  const [visible, setVisible] = React.useState<boolean>(false);

  return (
    <PaperProvider>
      <Button onPress={() => setVisible(true)} className="mt-12">
        Show Modal
      </Button>
      <ModalType5 visible={visible} setVisible={setVisible} />
      {/* 필요에 따라 다른 ModalType을 선택해 표시할 수 있음 */}
    </PaperProvider>
  );
};

export default ModalExample;
