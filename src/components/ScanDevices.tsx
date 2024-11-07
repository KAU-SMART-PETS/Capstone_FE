// src/components/ScanDevices.tsx
import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { OwnedBluetoothDevice } from '../types';

interface ScanDevicesProps {
  scanning: boolean;
  foundDevices: OwnedBluetoothDevice[];
  scanForDevices: () => void;
}

const ScanDevices: React.FC<ScanDevicesProps> = ({ scanning, foundDevices, scanForDevices }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>타겟 디바이스 스캔</Text>
      <Button
        title={scanning ? '스캔 중...' : '스캔 시작'}
        onPress={scanForDevices}
        disabled={scanning}
      />
      <FlatList
        data={foundDevices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.deviceItem}>
            <Text>이름: {item.name || '알 수 없음'}</Text>
            <Text>ID: {item.id}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>발견된 디바이스가 없습니다.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  deviceItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginBottom: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#888',
  },
});

export default ScanDevices;
