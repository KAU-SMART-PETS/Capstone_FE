// src/store/btDevice.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OwnedBluetoothDevice } from '@types';

/**
 * 블루투스 기기 정보 저장
 * @param device - 디바이스 객체
 */
export const saveDevice = async (device: OwnedBluetoothDevice): Promise<void> => {
  try {
    const existingDevices = await AsyncStorage.getItem('registeredDevices');
    let devices: OwnedBluetoothDevice[] = existingDevices ? JSON.parse(existingDevices) : [];
    if (!devices.find(d => d.id === device.id)) {
      devices.push(device);
      await AsyncStorage.setItem('registeredDevices', JSON.stringify(devices));
    }
  } catch (error) {
    console.error('디바이스 저장 오류:', error);
  }
};

/**
 * 저장된 블루투스 기기 목록 불러오기
 * @returns 디바이스 목록
 */
export const loadDevices = async (): Promise<OwnedBluetoothDevice[]> => {
  try {
    const existingDevices = await AsyncStorage.getItem('registeredDevices');
    return existingDevices ? JSON.parse(existingDevices) : [];
  } catch (error) {
    console.error('디바이스 불러오기 오류:', error);
    return [];
  }
};

/**
 * 블루투스 기기 삭제
 * @param deviceId - 삭제할 디바이스 ID
 */
export const deleteDevice = async (deviceId: string): Promise<void> => {
  try {
    const existingDevices = await AsyncStorage.getItem('registeredDevices');
    let devices: OwnedBluetoothDevice[] = existingDevices ? JSON.parse(existingDevices) : [];
    devices = devices.filter(d => d.id !== deviceId);
    await AsyncStorage.setItem('registeredDevices', JSON.stringify(devices));
  } catch (error) {
    console.error('디바이스 삭제 오류:', error);
  }
};
