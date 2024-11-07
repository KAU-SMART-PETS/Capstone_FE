// src/App.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, PermissionsAndroid, Platform } from 'react-native';
import manager from '@utils/bleManager';
import { registerBluetoothDevice, getOwnedBluetoothDevices } from '@api/bluetoothApi';
import { saveDevice, loadDevices } from '@store/btDevice';
import useBluetooth from '@hook/useBluetooth';
import RegisterDevice from '@components/RegisterDevice';
import DeviceList from '@components/DeviceList';
import ScanDevices from '@components/ScanDevices';
import { OwnedBluetoothDevice, LoginInfo, BluetoothRegistryRequest } from '@types';

const BlueotoothScanner: React.FC = () => {
  const [deviceName, setDeviceName] = useState<string>('');
  const [registeredDevices, setRegisteredDevices] = useState<OwnedBluetoothDevice[]>([]);
  const [targetDevices, setTargetDevices] = useState<OwnedBluetoothDevice[]>([]);
  const [registered, setRegistered] = useState<boolean>(false);

  // 로그인 정보 (실제 구현 시 적절히 관리)
  const loginInfo: LoginInfo = {
    authToken: 'user-auth-token', // 실제 인증 토큰으로 교체
  };

  /**
   * 등록된 디바이스 목록 로드
   */
  const fetchRegisteredDevices = async () => {
    const devices = await loadDevices();
    setRegisteredDevices(devices);
    setRegistered(devices.length > 0);
  };

  /**
   * 타겟 디바이스 목록 서버에서 가져오기
   */
  const fetchTargetDevices = async () => {
    try {
      const response = await getOwnedBluetoothDevices(loginInfo);
      if (response.success) {
        const devicesFromServer = response.devices; // 서버 응답 형식에 맞게 수정
        setTargetDevices(devicesFromServer);
      } else {
        console.log('타겟 디바이스 목록 조회 실패');
      }
    } catch (error) {
      console.error('타겟 디바이스 목록 조회 오류:', error);
    }
  };

  /**
   * 앱 초기화
   */
  useEffect(() => {
    const initialize = async () => {
      await fetchRegisteredDevices();
      await fetchTargetDevices();
      // 스캔 시작
      scanForDevices();

      // 5분마다 타겟 디바이스 목록 업데이트 및 스캔
      const interval = setInterval(async () => {
        await fetchTargetDevices();
        scanForDevices();
      }, 5 * 60 * 1000); // 5분

      return () => clearInterval(interval);
    };

    initialize();

    return () => {
      manager.destroy();
    };
  }, []);

  /**
   * Android 권한 요청
   */
  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]);

        if (
          granted['android.permission.ACCESS_FINE_LOCATION'] !== PermissionsAndroid.RESULTS.GRANTED
        ) {
          Alert.alert('권한 필요', '위치 권한이 필요합니다.');
        }
      }
    };

    requestPermissions();
  }, []);

  /**
   * 커스텀 훅 사용: 블루투스 스캔
   */
  const { scanning, foundDevices, scanForDevices } = useBluetooth(loginInfo, targetDevices);

  /**
   * 블루투스 디바이스 등록
   */
  const handleRegisterDevice = async () => {
    if (!deviceName) {
      Alert.alert('입력 필요', '디바이스 이름을 입력해주세요.');
      return;
    }

    const deviceId = `id-${Date.now()}`;
    const macAddress = '00:11:22:33:44:55'; // 실제 MAC 주소 또는 다른 고유 식별자

    const deviceInfo: BluetoothRegistryRequest = {
      deviceName,
      deviceId,
      macAddress,
    };

    try {
      const response = await registerBluetoothDevice(loginInfo, deviceInfo);

      if (response.success) {
        Alert.alert('성공', '디바이스가 성공적으로 등록되었습니다.');
        const newDevice: OwnedBluetoothDevice = {
          id: deviceId,
          name: deviceName,
          macAddress,
          status: 'disconnected',
        };
        await saveDevice(newDevice);
        setRegisteredDevices(prev => [...prev, newDevice]);
        setRegistered(true);
        setDeviceName('');
      } else {
        Alert.alert('실패', '디바이스 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('디바이스 등록 오류:', error);
      Alert.alert('오류', '디바이스 등록 중 오류가 발생했습니다.');
    }
  };

  /**
   * 블루투스 디바이스 연결
   * @param device - 연결할 디바이스 객체
   */
  const connectToDevice = async (device: OwnedBluetoothDevice) => {
    try {
      setRegisteredDevices(prevDevices =>
        prevDevices.map(d =>
          d.id === device.id ? { ...d, status: 'connecting' } : d
        )
      );

      const connectedDevice = await manager.connectToDevice(device.id);
      await connectedDevice.discoverAllServicesAndCharacteristics();

      setRegisteredDevices(prevDevices =>
        prevDevices.map(d =>
          d.id === device.id ? { ...d, status: 'connected' } : d
        )
      );

      Alert.alert('연결 성공', `${device.name}에 연결되었습니다.`);
    } catch (error) {
      console.error(`디바이스 ${device.id} 연결 오류:`, error);
      setRegisteredDevices(prevDevices =>
        prevDevices.map(d =>
          d.id === device.id ? { ...d, status: 'disconnected' } : d
        )
      );
      Alert.alert('연결 실패', `${device.name}에 연결할 수 없습니다.`);
    }
  };

  /**
   * 블루투스 디바이스 연결 해제
   * @param device - 연결 해제할 디바이스 객체
   */
  const disconnectFromDevice = async (device: OwnedBluetoothDevice) => {
    try {
      await manager.cancelDeviceConnection(device.id);
      setRegisteredDevices(prevDevices =>
        prevDevices.map(d =>
          d.id === device.id ? { ...d, status: 'disconnected' } : d
        )
      );
      Alert.alert('연결 해제', `${device.name}과의 연결이 해제되었습니다.`);
    } catch (error) {
      console.error(`디바이스 ${device.id} 연결 해제 오류:`, error);
      Alert.alert('오류', '연결 해제 중 오류가 발생했습니다.');
    }
  };

  /**
   * UI 렌더링
   */
  return (
    <View style={styles.container}>
      {!registered ? (
        <RegisterDevice
          deviceName={deviceName}
          setDeviceName={setDeviceName}
          handleRegisterDevice={handleRegisterDevice}
        />
      ) : (
        <View style={styles.scanContainer}>
          <Text style={styles.title}>등록된 디바이스</Text>
          <DeviceList
            devices={registeredDevices}
            onConnect={connectToDevice}
            onDisconnect={disconnectFromDevice}
          />
          <ScanDevices
            scanning={scanning}
            foundDevices={foundDevices}
            scanForDevices={scanForDevices}
          />
        </View>
      )}
    </View>
  );
};

/**
 * 스타일링
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  scanContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default App;
