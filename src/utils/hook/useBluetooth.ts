// src/utils/hooks/useBluetooth.ts
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { sendDetection } from '@api/bluetoothApi';
import manager from '@utils/bleManager';
import { OwnedBluetoothDevice, LoginInfo, DetectionInfo } from '@types';

interface UseBluetoothReturn {
  scanning: boolean;
  foundDevices: OwnedBluetoothDevice[];
  scanForDevices: () => void;
}

/**
 * 블루투스 스캔 및 발견된 디바이스 관리 훅
 * @param loginInfo - 로그인 정보
 * @param targetDevices - 스캔할 타겟 디바이스 목록
 * @returns {UseBluetoothReturn}
 */
const useBluetooth = (
  loginInfo: LoginInfo,
  targetDevices: OwnedBluetoothDevice[]
): UseBluetoothReturn => {
  const [scanning, setScanning] = useState<boolean>(false);
  const [foundDevices, setFoundDevices] = useState<OwnedBluetoothDevice[]>([]);

  /**
   * 블루투스 디바이스 스캔 시작
   */
  const scanForDevices = () => {
    if (scanning) {
      return;
    }

    setScanning(true);
    setFoundDevices([]);

    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error('블루투스 스캔 오류:', error);
        setScanning(false);
        Alert.alert('스캔 오류', '블루투스 스캔 중 오류가 발생했습니다.');
        return;
      }

      if (device && targetDevices.some(target => target.id === device.id)) {
        const targetDevice = targetDevices.find(target => target.id === device.id);
        if (targetDevice && !foundDevices.find(d => d.id === device.id)) {
          const newDevice: OwnedBluetoothDevice = {
            id: device.id,
            name: device.name || '알 수 없음',
            macAddress: '알 수 없음', // iOS에서는 MAC 주소 접근 불가
            status: 'disconnected',
          };
          setFoundDevices(prev => [...prev, newDevice]);

          // 서버에 발견 정보 전송
          const detectionInfo: DetectionInfo = {
            deviceId: device.id,
            timestamp: new Date().toISOString(),
          };

          sendDetection(loginInfo, detectionInfo)
            .then(() => {
              console.log(`디바이스 ${device.id} 발견 정보 전송 완료`);
            })
            .catch(err => {
              console.error(`디바이스 ${device.id} 발견 정보 전송 실패:`, err);
            });
        }
      }
    });

    // 10초 후 스캔 중지
    setTimeout(() => {
      manager.stopDeviceScan();
      setScanning(false);
    }, 10000);
  };

  // 클린업: 훅이 언마운트될 때 블루투스 매니저 정리
  useEffect(() => {
    return () => {
      // 매니저는 utils/bleManager.ts에서 관리하므로 여기서 destroy하지 않습니다.
    };
  }, []);

  return {
    scanning,
    foundDevices,
    scanForDevices,
  };
};

export default useBluetooth;
