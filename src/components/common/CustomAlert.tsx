import React from 'react';
import { View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import StylizedText from '@components/common/StylizedText';

const CustomAlert = ({ visible, onClose, message }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <StylizedText type="header2" styleClass="text-black text-center mb-4">
            {message}
          </StylizedText>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <StylizedText type="body2" styleClass="text-white">
              확인
            </StylizedText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertBox: {
    width: 300,
    padding: 20,
    paddingBottom: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    backgroundColor: '#73A8BA',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});

export default CustomAlert;
