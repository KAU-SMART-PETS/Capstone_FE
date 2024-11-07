// src/components/DeviceList.tsx
import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import DeviceItem from './DeviceItem';
import { OwnedBluetoothDevice } from '../types';

interface DeviceListProps {
  devices: OwnedBluetoothDevice[];
  onConnect: (device: OwnedBluetoothDevice) => void;
  onDisconnect: (device: OwnedBluetoothDevice) => void;
}

const DeviceList: React.FC<DeviceListProps> = ({ devices, onConnect, onDisconnect }) => {
  return (
    <FlatList
      data={devices}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <DeviceItem device={item} onConnect={onConnect} onDisconnect={onDisconnect} />
      )}
      ListEmptyComponent={<Text style={styles.emptyText}>등록된 디바이스가 없습니다.</Text>}
    />
  );
};

const styles = StyleSheet.create({
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});

export default DeviceList;
