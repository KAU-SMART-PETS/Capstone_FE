// src/components/RegisterDevice.tsx
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

interface RegisterDeviceProps {
  deviceName: string;
  setDeviceName: (name: string) => void;
  handleRegisterDevice: () => void;
}

const RegisterDevice: React.FC<RegisterDeviceProps> = ({
  deviceName,
  setDeviceName,
  handleRegisterDevice,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>디바이스 등록</Text>
      <TextInput
        style={styles.input}
        placeholder="디바이스 이름"
        value={deviceName}
        onChangeText={setDeviceName}
      />
      <Button title="등록" onPress={handleRegisterDevice} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
});

export default RegisterDevice;
