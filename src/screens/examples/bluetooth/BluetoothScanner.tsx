import React, { useEffect, useState } from 'react';
import { View, Text, Button, Platform, PermissionsAndroid, Alert } from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';
import BackgroundFetch from 'react-native-background-fetch';

const targetMacAddress = 'XX:XX:XX:XX:XX:XX'; // 찾고자 하는 기기의 MAC 주소

const BluetoothScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [deviceFound, setDeviceFound] = useState<Device | null>(null);
  const manager = new BleManager();

  useEffect(() => {
    requestPermissions(); // 필요한 권한 요청
    configureBackgroundFetch(); // 백그라운드 작업 설정

    const subscription = manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        startScan();
        subscription.remove();
      }
    }, true);

    return () => {
      manager.stopDeviceScan();
      manager.destroy();
    };
  }, []);

  // Android 권한 요청
  const requestPermissions = async (): Promise<void> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);
        const allGranted = Object.values(granted).every(
          (status) => status === PermissionsAndroid.RESULTS.GRANTED
        );

        if (!allGranted) {
          Alert.alert('Permissions not granted', 'Please grant all permissions to use Bluetooth features.');
        }
      } catch (error) {
        console.error("Permission request error:", error);
      }
    }
  };

  // 백그라운드 작업 설정
  const configureBackgroundFetch = (): void => {
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15, // 15분마다 실행
        enableHeadless: true,
        startOnBoot: true,
        stopOnTerminate: false,
      },
      async (taskId) => {
        console.log("[BackgroundFetch] taskId:", taskId);
        startScan(); // 백그라운드에서 스캔 시작
        BackgroundFetch.finish(taskId);
      },
      (error) => {
        console.log("[BackgroundFetch] configure failed:", error);
      }
    );

    BackgroundFetch.start();
  };

  // BLE 스캔 시작
  const startScan = (): void => {
    setIsScanning(true);
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log("BLE 스캔 중 오류:", error);
        setIsScanning(false);
        return;
      }

      if (device && device.id === targetMacAddress) {
        console.log("기기 발견:", device.name, device.id);
        setDeviceFound(device);
        manager.stopDeviceScan(); // 기기 발견 시 스캔 중지
        setIsScanning(false);
      }
    });
  };

  // 스캔 수동 중지
  const stopScan = (): void => {
    manager.stopDeviceScan();
    setIsScanning(false);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Bluetooth Device Scanner</Text>
      {isScanning ? (
        <Text>Scanning...</Text>
      ) : (
        <Button title="Start Scan" onPress={startScan} />
      )}
      {deviceFound && (
        <Text>Device Found: {deviceFound.name || "Unnamed Device"} - {deviceFound.id}</Text>
      )}
      <Button title="Stop Scan" onPress={stopScan} />
    </View>
  );
};

export default BluetoothScanner;
