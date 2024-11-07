// src/components/DeviceItem.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { OwnedBluetoothDevice } from '../types';

interface DeviceItemProps {
  device: OwnedBluetoothDevice;
  onConnect: (device: OwnedBluetoothDevice) => void;
  onDisconnect: (device: OwnedBluetoothDevice) => void;
}

const DeviceItem: React.FC<DeviceItemProps> = ({ device, onConnect, onDisconnect }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>이름: {device.name}</Text>
      <Text>ID: {device.id}</Text>
      <Text>상태: {device.status}</Text>
      {device.status === 'connected' ? (
        <Button title="연결 해제" onPress={() => onDisconnect(device)} />
      ) : (
        <Button title="연결 시도" onPress={() => onConnect(device)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DeviceItem;
