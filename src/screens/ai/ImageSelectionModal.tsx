import React, { memo } from 'react';
import { View } from 'react-native';
import { RoundedTextButton } from '@common/RoundedButton';
import ModalLayout from '@components/ModalLayout';

interface ImageSelectionModalProps {
  visible: boolean;
  onClose: (visible : boolean) => void;
  onSelectCamera: () => void;
  onSelectGallery: () => void;
}

const ImageSelectionModal: React.FC<ImageSelectionModalProps> =
   memo(({ visible, onClose, onSelectCamera, onSelectGallery }) => {
    return (
      <ModalLayout
        visible={visible}
        setVisible={onClose}
        rows={[
          {
            content: [
              <RoundedTextButton
                content="갤러리에서 가져오기"
                widthOption="lg"
                color="bg-primary"
                onPress={onSelectGallery}
                key="gallery"
              />,
              <RoundedTextButton
                content="촬영하기"
                widthOption="lg"
                color="bg-primary"
                onPress={onSelectCamera}
                key="camera"
              />,
            ],
            layout: 'col',
          },
        ]}
      />
    );
  }
);

export default memo(ImageSelectionModal);
