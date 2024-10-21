import React from 'react';
import { Modal as ModalWindow, Portal, Text, Button, PaperProvider } from 'react-native-paper';
import RoundedFrame from './RoundedBox';
import { View, StyleSheet } from 'react-native';

const Modal = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <PaperProvider>
        <Portal>
          <ModalWindow 
            visible={visible} 
            onDismiss={hideModal} 
            contentContainerStyle={styles.modalContent} 
          >
            {/* <RoundedFrame> */}
            <View style={styles.modalInnerContent}>
              <Text>Example Modal. Click outside this area to dismiss.</Text>
            </View>
            {/* </RoundedFrame> */}
          </ModalWindow>
        </Portal>
        <Button style={styles.button} onPress={showModal}>
          Show
        </Button>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalInnerContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    zIndex: 10, // Ensures content is on top
  },
  button: {
    marginTop: 30,
  }
});

export default Modal;
