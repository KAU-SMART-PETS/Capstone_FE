import React, { ReactNode } from 'react';
import { View } from 'react-native';
import Modal from '@common/Modal';
import StylizedText from '@common/StylizedText';

type ModalRow = {
  content: ReactNode[];
  layout?: 'row' | 'col';
};

type ModalLayoutProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  title?: string;
  titleType?: 'header1' | 'header2' | 'header3';
  titleAlign?: 'center' | 'left'; // 타이틀 정렬 옵션 추가
  rows: ModalRow[];
  position?: 'center' | 'bottom';
};

const ModalLayout: React.FC<ModalLayoutProps> = ({
  visible,
  setVisible,
  title,
  titleType = "header2",
  titleAlign = "center",
  rows,
  position = 'center',
}) => {
  return (
    <Modal visible={visible} hideModal={() => setVisible(false)} position={position}>
      {title && (
        <View style={{
          width: '100%',
          alignItems: titleAlign === 'center' ? 'center' : 'flex-start', // 컨테이너 정렬 설정
        }}>
          <StylizedText
            type={titleType}
            styleClass={`text-black my-5 ${titleAlign === 'left' ? 'text-left' : 'text-center'}`}
          >
            {title}
          </StylizedText>
        </View>
      )}
      {rows.map((row, rowIndex) => (
        <View
          key={rowIndex}
          style={{
            flexDirection: row.layout === 'row' ? 'row' : 'column',
          }}
        >
          {row.content.map((item, index) => (
            <View key={index}>
              {item}
            </View>
          ))}
        </View>
      ))}
    </Modal>
  );
};

export default ModalLayout;
