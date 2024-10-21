import React from 'react';
import { View } from 'react-native';
import { RoundedTextButton, ButtonColor } from '@common/RoundedButton'; // 필요한 컴포넌트 import
import Modal from '@common/Modal';
import { Button, PaperProvider, Portal } from 'react-native-paper';
import StylizedText from '@common/StylizedText';

type ModalWindowProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void; // boolean 값을 인자로 받도록 수정
};

const ModalType1: React.FC<ModalWindowProps> = ({visible, setVisible}) => {
  // 위아래로 버튼 2줄 있는 버전

  const buttons = [
    { content: '갤러리에서 가져오기' },
    { content: '촬영하기' },
  ];

  return (
    <Portal>
        <Modal visible={visible} hideModal={() => setVisible(false)}>
          {buttons.map(({ content }, index) => (
            <RoundedTextButton 
              key={index} 
              onPress={() => setVisible(false)} 
              content={content} 
              widthOption='lg' 
              textType='body2'
              textColor='text-white' 
            />
          ))}
        </Modal>
      </Portal>
  );
}


const ModalType2: React.FC<ModalWindowProps> = ({visible, setVisible}) => {
  // 1행 - 제목, 2행 - 버튼 두개 (나란히)

  const title = "산책을 종료하시겠어요?"
  const buttons = [
    { content: '취소', color : 'bg-grey' as ButtonColor},
    { content: '종료', color : 'bg-primary' as ButtonColor},
  ];

  return (
    <Portal>
        <Modal visible={visible} hideModal={() => setVisible(false)}>
          <StylizedText type="header2" color='text-black' className="my-5">
            {title}
          </StylizedText>
          <View className="flex-row mt-4">
          {buttons.map(({ content, color }, index) => (
            <RoundedTextButton 
              key={index} 
              onPress={() => setVisible(false)} 
              content={content} 
              widthOption='sm'
              color={color}
              textType='body2'
              textColor='text-white' 
            />
          ))}
          </View>
        </Modal>
      </Portal>
  );
}

const ModalType3: React.FC<ModalWindowProps> = ({visible, setVisible}) => {
  // 1행 - 제목, 2행 - 버튼 한 개

  const title = "오늘도 함께 산책해줘서 고마워요!"
  const button = { content: '취소', color : 'bg-primary' as ButtonColor}

  return (
    <Portal>
        <Modal visible={visible} hideModal={() => setVisible(false)}>
          <StylizedText type="header2" color='text-black' className="my-5">
            {title}
          </StylizedText>
          <View className="flex-row mt-4">
            <RoundedTextButton 
              key={button.content} 
              onPress={() => setVisible(false)} 
              content={button.content} 
              widthOption='sm'
              color={button.color}
              textType='body2'
              textColor='text-white' 
            />
          </View>
        </Modal>
      </Portal>
  );
}


const ModalExample: React.FC = () => {
  const [visible, setVisible] = React.useState<boolean>(false);

  return (
    <PaperProvider>
      {/* <ModalType1 visible={visible} setVisible={setVisible} /> */}
      <ModalType3 visible={visible} setVisible={setVisible} />

      {/* 어쨋건 이 어딘가에는 모달을 여는 코드나, 아니면 모달이 띄워질 바탕코드가 있어야함 */}
      <Button onPress={() => setVisible(true)} className="mt-10">
          Show Modal
        </Button>
    </PaperProvider>
  );
};

export default ModalExample;
