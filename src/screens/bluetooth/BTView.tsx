import React, { useEffect, useState } from 'react';
import { View, Text, Button, PermissionsAndroid, Platform, FlatList } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

const BTView = () => {
  const [bleManager] = useState(new BleManager());
  const [devices, setDevices] = useState([]);
  const [scanning, setScanning] = useState(false);

 
  const requestBluetoothPermissions = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        Platform.Version >= 31 && PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        Platform.Version >= 31 && PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ].filter(Boolean));

      if (granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
          (!Platform.Version >= 31 || (granted['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
                                        granted['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED))) {
        console.log('Permissions granted');
      } else {
        console.log('Permissions denied');
      }
    }
  };

  useEffect(() => {

    requestBluetoothPermissions();


    return () => {
      bleManager.destroy();
    };
  }, []);

  // Function to start scanning for BLE devices
  const startScan = () => {
    setDevices([]); // Clear existing devices
    setScanning(true);

    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error("Scan error:", error);
        setScanning(false);
        return;
      }

      // Add unique devices to the list
      setDevices((prevDevices) => {
        if (!prevDevices.find(d => d.id === device.id)) {
          return [...prevDevices, device];
        }
        return prevDevices;
      });
    });

    // Stop scanning after 10 seconds
    setTimeout(() => {
      bleManager.stopDeviceScan();
      setScanning(false);
    }, 10000);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button
        title={scanning ? 'Scanning...' : 'Start Scan'}
        onPress={startScan}
        disabled={scanning}
      />

      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>Device Name: {item.name || 'Unknown'}</Text>
            <Text>Device ID: {item.id}</Text>
          </View>
        )}
      />

      {devices.length === 0 && !scanning && (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No devices found</Text>
      )}
    </View>
  );
};

export default BTView;
